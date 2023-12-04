import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

function Nav({ toggleSidebar }) {
    const [restaurants, setRestaurants] = useState([]);
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();

    const handleSearchResults = (results) => {
        setRestaurants(results);
        setSearched(true);
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
                {/* {searched && <SearchResults results={restaurants} />} */}
                {searched && navigate("/search-results")}
            </main>
        </>
    );
}

export default Nav;