import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.")
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
                }, 1000);
            } else {
                const data = await response.json();
                throw new Error(data.detail || "An error occurred while changing the password.");
            }
        } catch (error) {
            setChangeError(true);
            setTimeout(() => {
                setChangeError(false);
            }, 1000);
        }
    };

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Change Password</h5>
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
                        <input
                            type={currentPasswordVisible ? "text" : "password"}
                            id="currentPassword"
                            className="form-control"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={toggleCurrentPasswordVisibility}>
                            {currentPasswordVisible ? "Hide Password" : "Show Password"}
                        </button>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">
                            New Password:
                        </label>
                        <input
                            type={newPasswordVisible ? "text" : "password"}
                            id="newPassword"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={toggleNewPasswordVisibility}>
                            {newPasswordVisible ? "Hide Password" : "Show Password"}
                        </button>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm New Password:
                        </label>
                        <input
                            type={confirmationVisible ? "text" : "password"}
                            id="confirmPassword"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={toggleConfirmationVisibility}>
                            {confirmationVisible ? "Hide Confirmation" : "Show Confirmation"}
                        </button>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;