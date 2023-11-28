import React, { useState } from "react";
import Sidebar from "./Sidebar";

const HomePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [restaurants, setRestaurants] = useState([]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        // Call backend API endpoint to get restaurants for the city
        const response = await fetch(
            `/restaurants${searchTerm}`
        );
        const data = await response.json();
        setRestaurants(data);
    };

    return (
        <div className="homepage">
            <header className="homepage-header">
                <div className="search-bar-container">
                    <h1 className="logo">Prestige Palate</h1>
                    <form onSubmit={handleSearch} className="search-form">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="City"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="search-button">
                            Search
                        </button>
                    </form>
                </div>
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
                Home 
            </main>
        </div>
    );
};

export default HomePage;
