import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-upper"></div>

            <div className="sidebar-lower">
                <NavLink className="nav-link" to="/home">
                    Home
                </NavLink>
                <NavLink className="nav-link" to="/favorite">
                    Favorite
                </NavLink>
                <NavLink className="nav-link" to="/friends">
                    Friends
                </NavLink>
                <NavLink className="nav-link" to="/new-review">
                    New Review
                </NavLink>
                <NavLink className="nav-link" to="/my-reviews">
                    My Reviews
                </NavLink>
                <NavLink className="nav-link" to="/editprofile">
                    Edit
                </NavLink>
                <NavLink className="nav-link" to="/login">
                    Sign In
                </NavLink>
                <NavLink className="nav-link" to="/signup">
                    Sign Up
                </NavLink>
                <NavLink className="nav-link" to="/logout">
                    Log Out
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
