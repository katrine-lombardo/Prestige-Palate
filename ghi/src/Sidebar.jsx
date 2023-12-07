import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { token } = useAuthContext();
    const closeSidebar = () => {
        if (isOpen) {
            toggleSidebar();
        }
    };

    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-upper">
                <button style={{ backgroundColor: 'rgba(255, 255, 255, 0)', border: 'none'}} className="close-btn">
                    &times;
                </button>
            </div>

            <div className="sidebar-lower">
                <NavLink className="nav-link" to="/" onClick={closeSidebar}>
                    <i className="fa-solid fa-house" style={{ marginRight: '8px' }}></i>&nbsp;Home
                </NavLink>
                {token ? (
                    <>
                        <NavLink className="nav-link" to="/favorites" onClick={closeSidebar}>
                            <i className="fa-solid fa-star" style={{ marginRight: '8px' }}></i>&nbsp;Favorite
                        </NavLink>
                        <NavLink className="nav-link" to="/myreviews" onClick={closeSidebar}>
                            <i className="fa-regular fa-pen-to-square" style={{ marginRight: '8px' }}></i>&nbsp;My Reviews
                        </NavLink>
                        <NavLink className="nav-link" to="/friends" onClick={closeSidebar}>
                            <i className="fa-solid fa-user-group" style={{ marginRight: '8px' }}></i>&nbsp;Friends
                        </NavLink>
                        <NavLink className="nav-link" to="/referral" onClick={closeSidebar}>
                            <i className="fa-solid fa-people-group" style={{ marginRight: '8px' }}></i>&nbsp;Refer a Friend
                        </NavLink>
                        
                        <div className="accordion text-left" id="accordionExample">
                            <div className="accordion-item">
                                <div className="accordion-header" id="headingSettings">
                                    <h5 className="mb-0">
                                        <button
                                            className="btn accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSettings"
                                            aria-expanded="false"
                                            aria-controls="collapseSettings"
                                        >
                                            <i className="fa-solid fa-gear" style={{ marginRight: '8px' }}></i>&nbsp;Settings
                                        </button>
                                    </h5>
                                </div>
                                <div
                                    id="collapseSettings"
                                    className="accordion-collapse collapse"
                                    aria-labelledby="headingSettings"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body text-left">
                                        <NavLink className="nav-link" to="/editprofile" onClick={closeSidebar}>
                                            <i className="fa-solid fa-user-pen" style={{ marginRight: '8px' }}></i>&nbsp;Edit Profile
                                        </NavLink>
                                        <NavLink className="nav-link" to="/updatepassword" onClick={closeSidebar}>
                                            <i className="fa-solid fa-file-pen" style={{ marginRight: '8px' }}></i>&nbsp;&nbsp;Update Password
                                        </NavLink>
                                        <NavLink className="nav-link" to="/deleteprofile" onClick={closeSidebar}>
                                            <i className="fa-solid fa-user-xmark" style={{ marginRight: '8px' }}></i>&nbsp;Delete Profile
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <NavLink className="nav-link" to="/logout" onClick={isOpen}>
                            <i className="fa-solid fa-arrow-right-from-bracket" style={{ marginRight: '8px' }}></i>&nbsp;Log Out
                        </NavLink>
                    </>
                ) : (
                    <>
                            <NavLink className="nav-link" to="/login" onClick={closeSidebar}>
                            <i className="fa-solid fa-arrow-right-to-bracket" style={{ marginRight: '8px' }}></i>&nbsp;Log In
                        </NavLink>
                            <NavLink className="nav-link" to="/signup" onClick={closeSidebar}>
                            <i className="fa-solid fa-user-plus" style={{ marginRight: '8px' }}></i>&nbsp;Sign Up
                        </NavLink>
                    </>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
