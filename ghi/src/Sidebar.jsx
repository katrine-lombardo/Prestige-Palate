import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { token } = useAuthContext();
    const [username, setUsername] = useState("");

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
            if (token) {
                const url = `${tokenUrl}/token`;
                fetch(url, {
                    credentials: "include",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setUsername(data.account.username.toUpperCase());
                    })
                    .catch((error) => console.error(error));
            }
        };
        handleFetchWithAPI();
    }, [token]);

    return (
        <div className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`} tabIndex="-1" id="sidebar" style={{ visibility: isOpen ? 'visible' : 'hidden', backgroundColor: '#f6f4ee', color: '#370507' }}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title">{token ? `WELCOME, ${username}` : ''}</h5>
                <button type="button" className="btn-close text-reset" aria-label="Close" onClick={handleCloseClick}></button>
            </div>
            <div className="offcanvas-body d-flex flex-column">
                <div>
                    {token && (
                        <>
                            <NavLink className="nav-link" to="/" onClick={closeSidebar}>
                                <i className="fa-solid fa-house" style={{ marginRight: '8px' }}></i>&nbsp;HOME
                            </NavLink>
                            <NavLink className="nav-link" to="/dashboard" onClick={closeSidebar}>
                                <i className="fa-solid fa-user-group" style={{ marginRight: '8px' }}></i>&nbsp;DASHBOARD
                            </NavLink>
                            <NavLink className="nav-link" to="/favorites" onClick={closeSidebar}>
                                <i className="fa-solid fa-star" style={{ marginRight: '8px' }}></i>&nbsp;FAVORITES
                            </NavLink>
                            <NavLink className="nav-link" to="/myreviews" onClick={closeSidebar}>
                                <i className="fa-regular fa-pen-to-square" style={{ marginRight: '8px' }}></i>&nbsp;MY REVIEWS
                            </NavLink>

                            <NavLink className="nav-link" to="/referral" onClick={closeSidebar}>
                                <i className="fa-solid fa-people-group" style={{ marginRight: '8px' }}></i>&nbsp;REFER A FRIEND
                            </NavLink>
                        </>
                    )}
                </div>
                <div className="mt-auto">
                    {token ? (
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
                                                <i className="fa-solid fa-gear" style={{ marginRight: '8px' }}></i>&nbsp;SETTINGS
                                            </button>
                                        </h5>
                                    </div>
                                    <div
                                        id="collapseSettings"
                                        className="accordion-collapse collapse settings-section"
                                        aria-labelledby="headingSettings"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body text-left">
                                            <NavLink className="nav-link" to="/editprofile" onClick={closeSidebar}>
                                                <i className="fa-solid fa-user-pen" style={{ marginRight: '8px' }}></i>&nbsp;EDIT PROFILE
                                            </NavLink>
                                            <NavLink className="nav-link" to="/updatepassword" onClick={closeSidebar}>
                                                <i className="fa-solid fa-key" style={{ marginRight: '8px' }}></i>&nbsp;&nbsp;UPDATE PASSWORD
                                            </NavLink>
                                            <NavLink className="nav-link" to="/deleteprofile" onClick={closeSidebar}>
                                                <i className="fa-solid fa-user-xmark" style={{ marginRight: '8px' }}></i>&nbsp;DELETE PROFILE
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <NavLink className="nav-link" to="/logout" onClick={closeSidebar}>
                                <i className="fa-solid fa-arrow-right-from-bracket" style={{ marginRight: '8px' }}></i>&nbsp;LOG OUT
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink className="nav-link" to="/login" onClick={closeSidebar}>
                                <i className="fa-solid fa-arrow-right-to-bracket" style={{ marginRight: '8px' }}></i>&nbsp;LOG IN
                            </NavLink>
                            <NavLink className="nav-link" to="/signup" onClick={closeSidebar}>
                                <i className="fa-solid fa-user-plus" style={{ marginRight: '8px' }}></i>&nbsp;SIGN UP
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;