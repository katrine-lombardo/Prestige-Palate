import { useState, useContext, createContext, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

const ContextStore = createContext(null);

export default function ContextProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const [detailedFavorites, setDetailedFavorites] = useState([]);
    const { token } = useAuthContext();

    const tokenUrl = import.meta.env.VITE_APP_API_HOST;
    if (!tokenUrl) {
        throw new Error("VITE_APP_API_HOST was undefined.");
    }

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!token) {
                setFavorites([]);
                return;
            }
            try {
                const response = await fetch(`${tokenUrl}/api/user/favorites`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    const favoriteData = await response.json();
                    setFavorites(favoriteData.map(fav => fav.place_id));
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };
        fetchFavorites();
    }, [token]);

    const store = {
        favorites,
        setFavorites,
        detailedFavorites,
        setDetailedFavorites
    };

    return (
        <ContextStore.Provider value={store}>
            {children}
        </ContextStore.Provider>
    );
}

export const useStore = () => useContext(ContextStore);
