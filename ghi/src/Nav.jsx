import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "./Search/SearchBar";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import logoImage from "./imgs/logo_lightmode.png";
import logoImage2 from "./imgs/logo_darkmode.png";

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
                const iconUrl = `${tokenUrl}/api/accounts/${id}`;
                const iconsUrl = `${tokenUrl}/api/icons`;

                const [accountResponse, iconResponse, iconsResponse] = await Promise.all([
                    fetch(accountUrl, { credentials: "include" }),
                    fetch(iconUrl, { credentials: "include" }),
                    fetch(iconsUrl, { credentials: "include" }),
                ]);

                const accountData = await accountResponse.json();
                const iconData = await iconResponse.json();
                const iconsData = await iconsResponse.json();

                setAccountId(accountData.account.id);
                setIconId(iconData.profile_icon_id);
                setIconUrl(iconsData[icon_id - 1]?.icon_url);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [token, id, icon_id]);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                        style={{
                            borderRadius: token ? '50%' : '0',
                            overflow: 'hidden',
                            border: token ? '2px solid black' : '0',
                            padding: token ? '2px' : '0',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {token ? (
                            <img
                                src={loading ? (
                                    < button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                ) : (
                                    icon_url
                                )}
                                alt="User"
                                className="user-icon"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '5%',
                                    objectFit: 'cover',
                                    margin: 'auto',
                                    display: 'block',
                                }}
                                loading={loading ? 'lazy' : 'eager'}
                            />
                        ) : (
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        )}
                    </div>
                </div>
            </nav>
            <main className="homepage-content">
            </main>
        </>
    );
}

export default Nav;
