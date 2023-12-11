import { useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.");
}

const FollowButton = ({ followingUsername }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const { token } = useAuthContext();

    const handleFollow = async (username) => {
        try {
            const followUrl = `${tokenUrl}/api/accounts/follow/`;
            const response = await fetch(followUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    following_username: followingUsername,
                }),
            });

            if (response.ok) {
                console.log(`You are now following ${followingUsername}`);
                setIsFollowing(true)
            } else {
                console.error(`Failed to follow ${followingUsername}`);
            }
        } catch (error) {
            console.error("Error following:", error);
        }
    };

    const handleUnfollow = async (username) => {
        try {
            const unfollowUrl = `${tokenUrl}/api/accounts/unfollow/`;
            const response = await fetch(unfollowUrl, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    following_username: followingUsername,
                }),
            });

            if (response.ok) {
                console.log(`You are no longer following ${followingUsername}`);
                setIsFollowing(false);
            } else {
                console.error(`Failed to unfollow ${followingUsername}`);
            }
        } catch (error) {
            console.error("Error unfollowing:", error);
        }
    };

    return (
        <button
            type="button"
            className="btn btn-light"
            onClick={isFollowing ? handleUnfollow : handleFollow}
        >
            <small>
                {isFollowing ? "- Unfollow" : "+ Follow"}
            </small>
        </button>
    );
};

export default FollowButton;
