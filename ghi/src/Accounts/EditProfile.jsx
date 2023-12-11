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
        document.title = `Edit Profile  ·  Prestige Palate`;
    }, []);

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
                    window.location.reload();
                }, 3000);
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
            }, 3000);
        }
    };

    return (
        <>
            <div style={{ marginTop: '25px' }}></div>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="card text-bg-light">
                    <h5 className="card-header bg-custom-two">EDIT PROFILE</h5>
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
                    <div className="card-body bg-custom">
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
                                    onChange={(e) => setFirstName(e.target.value)} required
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
                                    onChange={(e) => setLastName(e.target.value)} required
                                />
                            </div>
                            <div className="mb-3 icon-grid" style={{ overflowX: "auto", maxWidth: "100%" }}>
                                <label className="form-label" style={{ marginBottom: "5px", gridColumn: "span 8" }}>
                                    Select Your Icon:
                                </label>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "5px", padding: "5px", boxSizing: "border-box" }}>
                                    {icons.map((icon) => (
                                        <div key={icon.id} className="icon-container">
                                            <label className="icon-radio" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "5px", boxSizing: "border-box" }}>
                                                <div>
                                                    <img src={icon.icon_url} alt={`Icon ${icon.id}`} style={{ width: "100%", height: "auto", maxWidth: "30px" }} />
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <input
                                                        type="radio"
                                                        name="icon"
                                                        value={icon.id}
                                                        checked={selectedIcon.id === icon.id}
                                                        onChange={() => setSelectedIcon({ id: icon.id, icon_url: icon.icon_url })}
                                                    />
                                                    <div className="icon-name" style={{ fontSize: "12px", marginLeft: "5px" }}>{icon.icon_name}</div>
                                                </div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">
                                    UPDATE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: '25px' }}></div>
        </>
    );
};

export default EditProfile;
