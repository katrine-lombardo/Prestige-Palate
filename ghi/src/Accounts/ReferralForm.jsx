import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const ReferralForm = () => {
    const [referredEmail, setReferredEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const { token } = useAuthContext();
    const tokenUrl = import.meta.env.VITE_APP_API_HOST;

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const accountUrl = `${tokenUrl}/token`;
                const accountResponse = await fetch(accountUrl, { credentials: "include" });

                if (accountResponse.ok) {
                    const accountData = await accountResponse.json();
                    setCurrentUser(accountData.account.email);
                } else {
                    setErrorMessage("Unable to fetch current user data.");
                }
            } catch (error) {
                console.error("Error fetching current user:", error);
                setErrorMessage("Unable to fetch current user data.");
            }
        };

        fetchCurrentUser();
    }, [token, tokenUrl]);


    const handleReferral = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${tokenUrl}/api/accounts/refer/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    existing_user: currentUser,
                    referred: referredEmail,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage("Submission successful.");
                setTimeout(() => {
                    setMessage("");
                }, 3000);;
            } else {
                setErrorMessage(data.detail || "Referral submission unsuccessful.");
            }
        } catch (error) {
            console.error("Referral error:", error);
            setErrorMessage("Referral submission unsuccessful.");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Refer a Friend</h5>
            {errorMessage && (
                <div className="alert alert-danger mb-3" role="alert">
                    {errorMessage}
                </div>
            )}
            {message && (
                <div className="alert alert-success mb-3" role="alert">
                    {message}
                </div>
            )}
            <div className="card-body">
                <form onSubmit={handleReferral}>
                    <div className="mb-3">
                        <label htmlFor="referredEmail" className="form-label">
                            Email Address:
                        </label>
                        <input
                            type="email"
                            id="referredEmail"
                            placeholder="Your friend's email address"
                            className="form-control"
                            value={referredEmail}
                            onChange={(e) => setReferredEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" value="Refer">
                        Submit Referral
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReferralForm;