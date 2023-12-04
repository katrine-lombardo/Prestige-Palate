import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Nav({ toggleSidebar }) {
    const navigate = useNavigate();

    const handleSearchResults = (results) => {
        navigate("/search-results"); 
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Prestige Palate
                    </Link>
                    <div className="d-flex justify-content-center">
                        <SearchBar onSearch={handleSearchResults} />
                    </div>
                    <div
                        className="user-icon-container d-flex align-items-center"
                        onClick={toggleSidebar}
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                            alt="User"
                            className="user-icon"
                        />
                    </div>
                </div>
            </nav>
            <main className="homepage-content">
            </main>
        </>
    );
}

export default Nav;