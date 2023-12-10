import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const getToken = async (baseUrl, username, password) => {
    try {
        const url = `${baseUrl}/token`;
        const form = new FormData();
        form.append("username", username);
        form.append("password", password);
        await fetch(url, {
            method: "post",
            credentials: "include",
            body: form,
        });
        const response = await fetch(`${baseUrl}/token`, {
            credentials: "include",
        });
        const data = await response.json();
        return data?.access_token ?? null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { token, setToken, baseUrl } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newToken = await getToken(baseUrl, email, password);
            if (newToken) {
                setToken(newToken);
                setErrorMessage("");
            } else {
                throw new Error("Failed to get token after login.");
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
            setErrorMessage("An error occurred during login. Please try again.");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/");
            setErrorMessage("");
        }
    }, [token]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <div style={{ marginTop: '25px' }}></div>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div className="card text-bg-light mb-3">
                    <h5 className="card-header">LOGIN</h5>
                    <div className="card-body">
                        {errorMessage && (
                            <p className="alert alert-danger mb-3" role="alert">
                                {errorMessage}
                            </p>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email:
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Password:
                                </label>
                                <div className="input-group">
                                    <input
                                        id="password"
                                        type={passwordVisible ? "text" : "password"}
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
                            <button type="submit" className="btn btn-primary" value="Login">
                                Login
                            </button>
                        </form>
                        <p className="mt-3">
                            Want to make an account?{" "}
                            <Link to="/signup">Click here to sign up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
