import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const Sidebar = ({ isOpen }) => {
    const { token } = useAuthContext();

    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-upper">
                <button className="close-btn">
                    &times; close
                </button>
            </div>

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
                        <NavLink className="nav-link" to="/referral">
                            Refer a Friend
                        </NavLink>
                        <NavLink className="nav-link" to="/myreviews">
                            My Reviews
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
                                            <i className="fa-solid fa-gear"></i>&nbsp;Settings
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
                                        <NavLink className="nav-link" to="/editprofile">
                                            Edit Profile
                                        </NavLink>
                                        <NavLink className="nav-link" to="/updatepassword">
                                            Update Password
                                        </NavLink>
                                        <NavLink className="nav-link" to="/deleteprofile">
                                            Delete Profile
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <NavLink className="nav-link" to="/logout" onClick={isOpen}>
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
