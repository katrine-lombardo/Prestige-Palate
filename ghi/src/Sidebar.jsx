import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { token } = useAuthContext();
    const [firstName, setFirstName] = useState("");

    const closeSidebar = () => {
        if (isOpen) {
            toggleSidebar();
        }
    };
    const handleCloseClick = () => {
        toggleSidebar();
    };

    useEffect(() => {
        const handleFetchWithAPI = async () => {
            const url = `${tokenUrl}/token`;
            fetch(url, {
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    setFirstName(data.account.first_name);
                })
                .catch((error) => console.error(error));
        };
        handleFetchWithAPI();
    }, [token]);

    return (
        <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" id="sidebar" style={{ visibility: isOpen ? 'visible' : 'hidden' }}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title">{token ? `Welcome, ${firstName}` : ''}</h5>
                <button type="button" className="btn-close text-reset" aria-label="Close" onClick={handleCloseClick}></button>
            </div>
            <div className="offcanvas-body d-flex flex-column">
                <div>
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
                <div className="mt-auto">
                    {token && (
                        <>
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
                                                <i className="fa-solid fa-key" style={{ marginRight: '8px' }}></i>&nbsp;&nbsp;Update Password
                                            </NavLink>
                                            <NavLink className="nav-link" to="/deleteprofile" onClick={closeSidebar}>
                                                <i className="fa-solid fa-user-xmark" style={{ marginRight: '8px' }}></i>&nbsp;Delete Profile
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <NavLink className="nav-link" to="/logout" onClick={closeSidebar}>
                                <i className="fa-solid fa-arrow-right-from-bracket" style={{ marginRight: '8px' }}></i>&nbsp;Log Out
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Sidebar;
