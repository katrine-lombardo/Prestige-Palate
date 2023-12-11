import React, { useEffect } from "react";
import HomePageMap from "./HomePageMap";

const HomePage = () => {

    useEffect(() => {
        document.title = `Home  ·  Prestige Palate`;
    }, []);

    return (
        <div className="homepage">
            <HomePageMap />
        </div>
    );
};

export default HomePage;
