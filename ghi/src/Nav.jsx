import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "./Search/SearchBar";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import logoImage from "./imgs/logo_lightmode.png";
import logoImage2 from "./imgs/logo_darkmode.png";
import LineImage from "./imgs/sidebar.png";
import './Nav.css'

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

function Nav({ toggleSidebar }) {
    const navigate = useNavigate();
    const { token } = useAuthContext();
    const [id, setAccountId] = useState("");
    const [icon_id, setIconId] = useState("");
    const [icon_url, setIconUrl] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountUrl = `${tokenUrl}/token`;
                const accountResponse = await fetch(accountUrl, { credentials: "include" });
                const accountData = await accountResponse.json();
                if (accountData && token) {
                    setAccountId(accountData.account.id);
                    const iconUrl = `${tokenUrl}/api/accounts/${accountData.account.id}`;
                    const iconResponse = await fetch(iconUrl, { credentials: "include" });
                    const iconData = await iconResponse.json();

                    const iconsUrl = `${tokenUrl}/api/icons`;
                    const iconsResponse = await fetch(iconsUrl, { credentials: "include" });
                    const iconsData = await iconsResponse.json();

                    setIconId(iconData.profile_icon_id);
                    setIconUrl(iconsData[iconData.profile_icon_id - 1]?.icon_url);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    return (
        <>
            <nav className="navbar sticky-top navbar-expand-lg bg-custom">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img
                            src={logoImage}
                            alt="Logo"
                            className="logo-image"
                            style={{ width: '50px', height: '50px' }}
                        />
                    </Link>
                    <div className="d-flex justify-content-center">
                        <SearchBar onSearch={(results) => navigate("/search-results")} />
                    </div>
                    <div
                        className="user-icon-container d-flex align-items-center"
                        onClick={toggleSidebar}
                    >
                        {token ? (
                            <img
                                src={loading ? LineImage : icon_url}
                                alt="User"
                                className="user-icon"
                                loading={loading ? 'lazy' : 'eager'}
                            />
                        ) : (
                            <img
                                src={LineImage}
                                alt="User"
                                className="nav-image"
                                loading={loading ? 'lazy' : 'eager'}
                            />
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Nav;