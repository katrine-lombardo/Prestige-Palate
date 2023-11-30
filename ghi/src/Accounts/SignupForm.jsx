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
            setErrorMessage("Passwords do not match.");
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
        <div className="signup-form">
            <h2>Sign Up</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="button" onClick={togglePasswordVisibility}>
                    {passwordVisible ? "Hide" : "Show"}
                </button>
                <input
                    type={confirmationVisible ? "text" : "password"}
                    placeholder="password confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                />
                <button type="button" onClick={toggleConfirmationVisibility}>
                    {confirmationVisible ? "Hide" : "Show"}
                </button>
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account?{" "}
                <Link to="/login">Click Here to Log In</Link>
            </p>
        </div>
    );
};

export default SignupForm;