import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const PhotoCard = ({ username }) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuthContext();

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const url = `${tokenUrl}/photos/${username}`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch photos");
                }

                const data = await response.json();
                setPhotos(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [username, token]);

    const renderNullPhotos = () => (
        <div>
            <div className="container mt-4">
                {loading ? "Loading photos..." : "No photos here. Yet..."}
            </div>
            {!loading && (
                <div>
                    <Link to={`/`}>
                        <button
                            style={{ marginRight: "5px" }}
                            type="button"
                            className="btn btn-secondary mt-3 ms-2"
                        >
                            Start your culinary adventure now
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );

    return (
        <div>
            <h3>{username}'s Photos</h3>
            <div className="photo-list">
                {photos.length > 0 ? (
                    photos.map((photo) => (
                        <div key={String(photo.url)} className="photo-card">
                            {Array.isArray(photo.photo_urls) && photo.photo_urls.length > 0 ? (
                                photo.photo_urls.map((url) => (
                                    <img key={String(url)} src={url} alt={`Photo by ${username}`} />
                                ))
                            ) : (
                                <p>No photos available for this entry</p>
                            )}
                        </div>
                    ))
                ) : (
                    renderNullPhotos()
                )}
            </div>
            {error && <div>Error: {error}</div>}
        </div>
    );
};


export default PhotoCard;
