import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const FollowContext = createContext();

export const FollowProvider = ({ children }) => {
    const [following, setFollowing] = useState([]);
    const { token } = useAuthContext();

    const tokenUrl = import.meta.env.VITE_APP_API_HOST;
    if (!tokenUrl) {
        throw new Error("VITE_APP_API_HOST was undefined.");
    }

    
    useEffect(() => {
        const fetchFollowing = async () => {
            if (!token) return;
            try {
                const userResponse = await fetch(`${tokenUrl}/token`, {
                    headers: { Authorization: `Bearer ${token}` },
                    credentials: 'include',
                });
                if (!userResponse.ok) throw new Error('Failed to fetch user data');
                const userData = await userResponse.json();
                const currentUsername = userData.account.username;

                const followingResponse = await fetch(`${tokenUrl}/api/accounts/following/${currentUsername}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!followingResponse.ok) throw new Error('Failed to fetch following data');
                const followingData = await followingResponse.json();
                setFollowing(followingData);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchFollowing();
    }, [token, tokenUrl]);




    const followUser = async (username) => {
        try {
            const followUrl = `${tokenUrl}/api/accounts/follow/`;
            const response = await fetch(followUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ following_username: username }),
            });

            if (response.ok) {
                const updatedFollowing = [...following, username];
                setFollowing(updatedFollowing);
            }
        } catch (error) {
            console.error("Error following user:", error);
        }
    };

    const unfollowUser = async (username) => {
        try {
            const unfollowUrl = `${tokenUrl}/api/accounts/unfollow/`;
            const response = await fetch(unfollowUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ following_username: username }),
            });

            if (response.ok) {
                const updatedFollowing = following.filter(user => user !== username);
                setFollowing(updatedFollowing);
            }
        } catch (error) {
            console.error("Error unfollowing user:", error);
        }
    };


    const isFollowing = (username) => {
        return following.includes(username);
    };

    return (
        <FollowContext.Provider value={{ following, followUser, unfollowUser, isFollowing }}>
            {children}
        </FollowContext.Provider>
    );
};

export const useFollow = () => useContext(FollowContext);
