import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import React, { useState } from "react";


function Nav() {
    const { logout } = useToken();
    const { token } = useAuthContext();
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Prestige Palate
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            activeclassname="active"
                            to="/"
                        >
                            Home
                        </NavLink>
                    </li>
                    <div>
                        {!token && (
                            <button className="signIn" onClick={() => navigate("/login")}>
                                Sign In
                            </button>
                        )}
                    </div>
                    <div>
                        {token && (
                            <button className="signIn" onClick={logout}>
                                Sign Out
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Nav;
