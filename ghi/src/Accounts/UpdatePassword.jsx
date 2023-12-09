import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const UpdatePassword = () => {
    const [id, setAccountId] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [changeSuccess, setChangeSuccess] = useState(false);
    const [changeError, setChangeError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState("");
    const { token } = useAuthContext();

    const toggleCurrentPasswordVisibility = () => {
        setCurrentPasswordVisible(!currentPasswordVisible);
    };

    const toggleNewPasswordVisibility = () => {
        setNewPasswordVisible(!newPasswordVisible);
    };

    const toggleConfirmationVisibility = () => {
        setConfirmationVisible(!confirmationVisible);
    };

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

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (!token) {
            console.error("Token not available.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordMatchError("Passwords do not match. Please check and try again.");
            setTimeout(() => {
                setPasswordMatchError("");
            }, 3000);
            return;
        } else {
            setPasswordMatchError("");
        }

        const endpoint = `${tokenUrl}/api/accounts/${id}/change-password/`;
        try {
            const response = await fetch(endpoint, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                    confirm_password: confirmPassword,
                }),
            });

            if (response.ok) {
                setChangeSuccess(true);
                setTimeout(() => {
                    setChangeSuccess(false);
                }, 3000);
            } else {
                const data = await response.json();
                throw new Error(data.detail || "An error occurred while changing the password.");
            }
        } catch (error) {
            setChangeError(true);
            setTimeout(() => {
                setChangeError(false);
            }, 3000);
        }
    };

    return (
        <>
            <div style={{ marginTop: '25px' }}></div>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div className="card text-bg-light mb-3">
                    <h5 className="card-header">CHANGE PASSWORD</h5>
                    {changeSuccess && (
                        <div className="alert alert-success" role="alert">
                            Password successfully changed.
                        </div>
                    )}
                    {changeError && (
                        <div className="alert alert-danger" role="alert">
                            Incorrect current password. Please try again.
                        </div>
                    )}
                    {passwordMatchError && (
                        <div className="alert alert-danger" role="alert">
                            {passwordMatchError}
                        </div>
                    )}
                    <div className="card-body">
                        <form onSubmit={handleUpdatePassword}>
                            <div className="mb-3">
                                <label htmlFor="currentPassword" className="form-label">
                                    Current Password:
                                </label>
                                <div className="input-group">
                                    <input
                                        type={currentPasswordVisible ? "text" : "password"}
                                        id="currentPassword"
                                        className="form-control rounded-right"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={toggleCurrentPasswordVisibility}
                                    >
                                        {currentPasswordVisible ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newPassword" className="form-label">
                                    New Password:
                                </label>
                                <div className="input-group">
                                    <input
                                        type={newPasswordVisible ? "text" : "password"}
                                        id="newPassword"
                                        className="form-control rounded-right"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={toggleNewPasswordVisibility}
                                    >
                                        {newPasswordVisible ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm New Password:
                                </label>
                                <div className="input-group">
                                    <input
                                        type={confirmationVisible ? "text" : "password"}
                                        id="confirmPassword"
                                        className="form-control rounded-right"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={toggleConfirmationVisibility}
                                    >
                                        {confirmationVisible ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                UPDATE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdatePassword;