import React, { useState } from "react";
import Sidebar from "./Sidebar";
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";

const HomePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [restaurants, setRestaurants] = useState([]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const handleSearchResults = (results) => {
        if (results.length > 0) {
            console.log("Setting restaurants:", results);
            setRestaurants(results);
        }
    };

    return (
        <div className="homepage">
            <header className="homepage-header">
                <SearchBar onSearch={handleSearchResults} />
                <h1 className="logo">Prestige Palate</h1>
                <div className="user-icon-container" onClick={toggleSidebar}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                        alt="User"
                        className="user-icon"
                    />
                </div>
            </header>
            {isSidebarOpen && <Sidebar />}
            <main className="homepage-content">
                <SearchResults results={restaurants} />
            </main>
        </div>
    );
};

export default HomePage;
