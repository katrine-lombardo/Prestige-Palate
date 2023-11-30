import React, { useState } from "react";

const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState("");

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const endpoint = `/api/accounts/{account_id}/edit-profile/`;

        try {
            const response = await fetch(endpoint, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    //token
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username: email,
                    first_name: firstName,
                    last_name: lastName,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail ||
                    "An error occurred while updating the profile."
                );
            }

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Update profile error:", error);
            alert(error.message || "Failed to update profile.");
        }
    };

    return (
        <div className="edit-profile">
            <h2>Edit Profile</h2>
            <form onSubmit={handleUpdateProfile}>
                <div>
                    <label htmlFor="first-name">First Name</label>
                    <input
                        id="first-name"
                        type="text"
                        value={firstName}
                        placeholder="firstname"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        id="last-name"
                        type="text"
                        value={lastName}
                        placeholder="lastName"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {/* updating the icon ?*/}
                <div>
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
