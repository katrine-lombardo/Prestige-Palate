import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const { logout } = useToken();
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        logout();
        navigate("/");
    };

    return (
        <>
            <div style={{ marginTop: '25px' }}></div>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div className="card text-bg-light mb-3">
                    <h5 className="card-header">LOG OUT</h5>
                    <div className="card-body">
                        <form onSubmit={handleLogout}>
                            <div>Are you sure you want to log out?</div>
                            <div style={{ marginTop: '5px' }}></div>
                            <button type="submit" className="btn btn-danger">
                                Logout
                            </button>
                        </form>
                    </div></div>
            </div>
        </>
    );
};

export default LogoutButton;