import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

const SignupForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useToken();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await apiClient.post("/api/accounts", {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
            });

            if (response.data) {
                await login(email, password);
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(
                    error.response.data.detail || "Failed to sign up."
                );
            } else {
                setErrorMessage("Failed to sign up.");
            }
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
                    type={passwordVisible ? "text" : "password"}
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button onClick={togglePasswordVisibility}>
                    {passwordVisible ? "Hide" : "Show"}
                </button>
                <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="password confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                />
                <button onClick={togglePasswordVisibility}>
                    {passwordVisible ? "Hide" : "Show"}
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
