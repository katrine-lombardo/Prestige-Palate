import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [id, setAccountId] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("");
    const { token } = useAuthContext();
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateError, setError] = useState(false);
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        const handleFetchWithAPI = async () => {
            const url = `${tokenUrl}/token`;
            fetch(url, {
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    setAccountId(data.account.id);
                })
                .catch((error) => console.error(error));
        };
        handleFetchWithAPI();
    }, [token]);

    useEffect(() => {
        const handleFetchWithAPI = async () => {
            const iconsUrl = `${tokenUrl}/api/icons`;
            fetch(iconsUrl)
                .then((response) => response.json())
                .then((data) => {
                    setIcons(data);
                })
                .catch((error) => console.error(error));
        };
        handleFetchWithAPI();
    }, [token]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!token) {
            console.error("Token not available.");
            return;
        }

        const endpoint = `${tokenUrl}/api/accounts/${id}/edit-profile/`;
        try {
            const response = await fetch(endpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    profile_icon_id: selectedIcon,
                }),
            });
            if (response.ok) {
                setUpdateSuccess(true);
                setTimeout(() => {
                    setUpdateSuccess(false);
                }, 1000);
            } else {
                const data = await response.json();
                throw new Error(
                    data.detail ||
                    "An error occurred while updating the profile."
                );
            }
        } catch (error) {
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 1000);
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
            {updateError && (
                <div className="alert alert-danger" role="alert">
                    There was trouble updating your profile. Please try again.
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
                        <label htmlFor="iconSelect" className="form-label">
                            Select Profile Icon:
                        </label>
                        <select
                            id="iconSelect"
                            className="form-select"
                            value={selectedIcon}
                            onChange={(e) => setSelectedIcon(e.target.value)}
                        >
                            <option value="">Select an icon</option>
                            {icons.map((icon) => (
                                <option key={icon.id} value={icon.id}>
                                    {icon.icon_name}
                                </option>
                            ))}
                        </select>
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