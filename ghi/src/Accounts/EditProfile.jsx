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
    const { token } = useAuthContext();
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [updateError, setError] = useState(false);
    const [icons, setIcons] = useState([]);
    const [selectedIcon, setSelectedIcon] = useState({ id: "", icon_url: "" });

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
                    if (data.length > 0) {
                        setSelectedIcon({ id: data[0].id, icon_url: data[0].icon_url });
                    }
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
                    profile_icon_id: selectedIcon.id,
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
                    <div className="mb-3 icon-grid" style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "5px" }}>
                        <label className="form-label" style={{ gridColumn: "span 8", marginBottom: "5px" }}>
                            Select Your Icon:
                        </label>
                        {icons.map((icon) => (
                            <label key={icon.id} className="icon-radio" style={{ width: "100%", padding: "5px", boxSizing: "border-box" }}>
                                <input
                                    type="radio"
                                    name="icon"
                                    value={icon.id}
                                    checked={selectedIcon.id === icon.id}
                                    onChange={() => setSelectedIcon({ id: icon.id, icon_url: icon.icon_url })}
                                />
                                <img src={icon.icon_url} alt={`Icon ${icon.id}`} style={{ width: "100%", height: "auto", maxWidth: "30px" }} />
                            </label>
                        ))}
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