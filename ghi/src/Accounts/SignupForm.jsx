import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

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
            const response = await fetch("http://localhost:8000/api/accounts", {
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
        }
    };

    return (
        <div className="card text-bg-light mb-3">
            <h2 className="card-header">Sign Up</h2>
            <div className="card-body">
                {errorMessage && (
                    <p className="alert alert-danger mb-3" role="alert">
                        {errorMessage}
                    </p>
                )}
                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label htmlFor="firstname" className="form-label">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            placeholder="first name"
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
                            placeholder="last name"
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
                            placeholder="email address"
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
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={togglePasswordVisibility}>
                            {passwordVisible ? "Hide Password" : "Show Password"}
                        </button>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmation" className="form-label">
                            Password Confirmation:
                        </label>
                        <input
                            type={confirmationVisible ? "text" : "password"}
                            id="confirmation"
                            placeholder="password confirmation"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                        <button type="button" onClick={toggleConfirmationVisibility}>
                            {confirmationVisible ? "Hide Confirmation" : "Show Confirmation"}
                        </button>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <p>
                    Already have an account?{" "}
                    <Link to="/login">Click Here to Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;