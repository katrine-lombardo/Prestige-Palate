import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const Sidebar = ({ isOpen }) => {
    const { token } = useAuthContext();

    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-upper"></div>

            <div className="sidebar-lower">
                <NavLink className="nav-link" to="/">
                    Home
                </NavLink>
                {token ? (
                    <>
                        <NavLink className="nav-link" to="/favorites" onClick = {isOpen}>
                            Favorite
                        </NavLink>
                        <NavLink className="nav-link" to="/friends" onClick={isOpen}>
                            Friends
                        </NavLink>
                        <NavLink className="nav-link" to="/new-review" onClick={isOpen}>
                            New Review
                        </NavLink>
                        <NavLink className="nav-link" to="/myreviews" onClick={isOpen}>
                            My Reviews
                        </NavLink>
                        <NavLink className="nav-link" to="/editprofile" onClick={isOpen}>
                            Edit Profile
                        </NavLink>
                        <NavLink className="nav-link" to="/updatepassword" onClick={isOpen}>
                            Update Password
                        </NavLink>
                        <NavLink className="nav-link" to="/deleteprofile" onClick={isOpen}>
                            Delete Profile
                        </NavLink>
                        <NavLink className="nav-link" to="/logout" onClick={isOpen}>
                            Log Out
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink className="nav-link" to="/login" onClick={isOpen}>
                            Log In
                        </NavLink>
                        <NavLink className="nav-link" to="/signup" onClick={isOpen}>
                            Sign Up
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;