import React, { useState } from "react";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";

const HomePage = ({ toggleSidebar }) => {
    const [restaurants, setRestaurants] = useState([]);

    const handleSearchResults = (results) => {
        setRestaurants(results);
    };

    return (
        <div className="homepage">
            <header className="homepage-header">
                <SearchBar onSearch={handleSearchResults} />
                <div className="user-icon-container" onClick={toggleSidebar}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                        alt="User"
                        className="user-icon"
                    />
                </div>
            </header>
            <main className="homepage-content">
                <SearchResults results={restaurants} />
            </main>
        </div>
    );
};

export default HomePage;
