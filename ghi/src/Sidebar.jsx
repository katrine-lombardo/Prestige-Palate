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
                        <NavLink className="nav-link" to="/favorites">
                            Favorite
                        </NavLink>
                        <NavLink className="nav-link" to="/friends">
                            Friends
                        </NavLink>
                        <NavLink className="nav-link" to="/new-review">
                            New Review
                        </NavLink>
                        <NavLink className="nav-link" to="/myreviews">
                            My Reviews
                        </NavLink>
                        <NavLink className="nav-link" to="/editprofile">
                            Edit Profile
                        </NavLink>
                        <NavLink className="nav-link" to="/updatepassword">
                            Update Password
                        </NavLink>
                        <NavLink className="nav-link" to="/deleteprofile">
                            Delete Profile
                        </NavLink>
                        <NavLink className="nav-link" to="/logout">
                            Log Out
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink className="nav-link" to="/login">
                            Log In
                        </NavLink>
                        <NavLink className="nav-link" to="/signup">
                            Sign Up
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;