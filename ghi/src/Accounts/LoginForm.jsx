import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useToken();
    const { token } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        if (console.error){
            setErrorMessage("Incorrect login information.");
        }
    };
    useEffect(() => {
        if (token) {
            navigate("/home")
            setErrorMessage("")
        }
    }, [token]) 

    return (
        <div className="card text-bg-light mb-3">
            <h5 className="card-header">Login</h5>
            <div className="card-body">
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
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
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" value="Login">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
