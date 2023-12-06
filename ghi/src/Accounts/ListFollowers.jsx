import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.");
}

const ListFollowers = () => {
    const [followers, setFollowers] = useState([])
    const [username, setUsername] = useState("")
    const { token } = useAuthContext();

    useEffect(() => {
        const handleFetchWithAPI = async () => {
            const url = `${tokenUrl}/token`;
            fetch(url, {
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    setUsername(data.account.username);
                })
                .catch((error) => console.error(error));

        };
        const fetchFollowers = async () => {
            if (username) {
                const url = `${tokenUrl}/api/accounts/following/${username}`;
                fetch(url, {
                    credentials: "include",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setFollowers(data);
                    })
                    .catch((error) => console.error(error));
            }
        };
        handleFetchWithAPI();
        fetchFollowers();
    }, [token, username]);

}

export default ListFollowers
