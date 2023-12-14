import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.")
}

const DeleteProfile = () => {
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [id, setAccountId] = useState("");
    const { token, setToken } = useAuthContext();

    useEffect(() => {
        document.title = `Delete Profile  ·  Prestige Palate`;
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

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${tokenUrl}/api/accounts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setDeleteSuccess(true);
                setToken(null);
                setTimeout(() => {
                    setDeleteSuccess(false);
                }, 3000);
            } else {
                const data = await response.json();
                if (response.status === 403) {
                    setErrorMessage("Deleting admin account not allowed.");
                } else {
                    setErrorMessage(data.detail || "Failed to delete account at this time.");
                }
            }
        } catch (error) {
            setErrorMessage("Failed to delete account at this time.");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };

    return (
        <>
            <div style={{ marginTop: '25px' }}></div>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div className="card text-bg-light mb-3">
                    <h5 className="card-header bg-custom-two">DELETE PROFILE</h5>
                    <div className="card-body bg-custom">
                        <form onSubmit={handleDelete}>
                            {deleteSuccess && (
                                <div className="alert alert-success" role="alert">
                                    Account successfully deleted.
                                </div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger mb-3" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            {!deleteSuccess ? (
                                <>
                                    <div>
                                        Are you sure you want to delete your account?
                                    </div>
                                    <p>This action is permanent and irreversible.
                                    </p>
                                    <button
                                        className="btn btn-danger"
                                    >
                                        YES, I'd like to DELETE my account.
                                    </button>
                                </>
                            ) : (
                                <div>
                                    Sorry to see you go. We'll be here if you need us again!
                                </div>
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DeleteProfile;
