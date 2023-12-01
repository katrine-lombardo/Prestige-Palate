import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const { token } = useAuthContext();
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        const handleFetchWithAPI = async () => {
            const url = `${tokenUrl}/token`;
            fetch(url, {
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("username: ", data.account.id);
                    setAccountId(data.account.id);
                })
                .catch((error) => console.error(error));
        };
        handleFetchWithAPI();
    }, [token]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!token) {
            console.error("Token not available yet.");
            return;
        }

        const endpoint = `${tokenUrl}/api/accounts/edit-profile/`;
        try {
            const response = await fetch(endpoint, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username: username,
                    first_name: firstName,
                    last_name: lastName,
                }),
            });
            if (response.ok) {
                setUpdateSuccess(true);
            } else {
                const data = await response.json();
                throw new Error(
                    data.detail ||
                    "An error occurred while updating the profile."
                );
            }
        } catch (error) {
            console.error("Update profile error:", error);
            alert(error.message || "Failed to update profile.");
        }
    };

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Edit Profile</h5>
            {updateSuccess && (
                <div className="alert alert-success" role="alert">
                    Successfully updated account information.
                </div>
            )}
            <div className="card-body">
                <form onSubmit={handleUpdateProfile}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;