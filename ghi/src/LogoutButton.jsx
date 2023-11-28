import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const { logout } = useToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <button className="btn btn-primary" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
