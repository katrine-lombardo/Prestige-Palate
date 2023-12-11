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
        document.title = `Refer a friend  ·  Prestige Palate`;
    }, []);

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
                setMessage("EXCITING NEWS! Your referral is complete.");
                setTimeout(() => {
                    setMessage("");
                }, 5000);;
            } else {
                setErrorMessage(data.detail || "Referral submission unsuccessful.");
            }
        } catch (error) {
            setErrorMessage("Hmm.. Looks like your friend has already been referred!");
            setTimeout(() => {
                setErrorMessage("");
            }, 5000);
        }
    };

    return (
        <>
            <div style={{ marginTop: '25px' }}></div>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div className="card text-bg-light mb-3">
                    <h5 className="card-header bg-custom-two">REFER A FRIEND</h5>
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
                    <div className="card-body bg-custom">
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
                                SUBMIT
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReferralForm;
