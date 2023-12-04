import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

function Nav({ toggleSidebar }) {
    const [restaurants, setRestaurants] = useState([]);

    const handleSearchResults = (results) => {
        setRestaurants(results);
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
                <SearchResults results={restaurants} />
            </main>
        </>
    );
}

export default Nav;