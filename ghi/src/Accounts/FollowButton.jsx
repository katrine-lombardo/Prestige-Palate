import React, { useState, useEffect } from "react";
import { useFollow } from "../FollowContext";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.");
}

const FollowButton = ({ followingUsername }) => {
    const { followUser, unfollowUser, isFollowing } = useFollow();
    const [following, setFollowing] = useState(isFollowing(followingUsername));

    useEffect(() => {
        setFollowing(isFollowing(followingUsername));
    }, [followingUsername, isFollowing]);


    const handleFollowClick = async () => {
        if (following) {
            await unfollowUser(followingUsername);
            setFollowing(false);
        } else {
            await followUser(followingUsername);
            setFollowing(true);
        }
    };

    return (
        <button
            type="button"
            className="btn btn-light"
            onClick={handleFollowClick}
        >
            <small>{following ? "- Unfollow" : "+ Follow"}</small>
        </button>
    );
};

export default FollowButton;
