import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const SignupForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useToken();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmationVisibility = () => {
        setConfirmationVisible(!confirmationVisible);
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            setErrorMessage("Passwords do not match. Please check and try again.");
            return;
        }

        try {
            const response = await fetch(`${tokenUrl}/api/accounts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    username: username,
                    password: password,
                    first_name: firstName,
                    last_name: lastName,
                }),
            });
            const data = await response.json();

            if (response.ok) {
                await login(email, password);
                navigate("/");
            } else {
                setErrorMessage(data.detail || "Failed to sign up.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            setErrorMessage("Failed to sign up.");
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
                    <h5 className="card-header bg-custom-two">Sign Up</h5>
                    {errorMessage && (
                        <div className="alert alert-danger mb-3" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <div className="card-body bg-custom">
                        <form onSubmit={handleSignup}>
                            <div className="mb-3">
                                <label htmlFor="firstname" className="form-label">
                                    First Name:
                                </label>
                                <input
                                    type="text"
                                    id="firstname"
                                    placeholder="Enter your first name"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastname" className="form-label">
                                    Last Name:
                                </label>
                                <input
                                    type="text"
                                    id="lastname"
                                    placeholder="Enter your last name"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email Address:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email address"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Choose a username"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password:
                                </label>
                                <div className="input-group">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        id="password"
                                        placeholder="Enter your password"
                                        className="form-control rounded-right"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmation" className="form-label">
                                    Password Confirmation:
                                </label>
                                <div className="input-group">
                                    <input
                                        type={confirmationVisible ? "text" : "password"}
                                        id="confirmation"
                                        placeholder="Re-enter your password"
                                        className="form-control rounded-right"
                                        value={passwordConfirmation}
                                        onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                            <button type="submit" className="btn btn-primary" value="Signup">
                                SIGN UP
                            </button>
                            <p>
                                Already have an account?{" "}
                                <Link to="/login">Click Here to Log In</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupForm;