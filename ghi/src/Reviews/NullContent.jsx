import React from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const NullContent = ({ message, isLoading, showButton }) => (
    <div className="container mt-4">
        {isLoading ? (
            <Loading />
        ) : (
            <div className="container">
                <p>{message}</p>
                {showButton && (
                    <Link to={`/`}>
                        <button
                            style={{ marginRight: "5px" }}
                            type="button"
                            className="btn btn-secondary mt-3 ms-2"
                        >
                            Start your culinary adventure now
                        </button>
                    </Link>
                )}
            </div>
        )}
    </div>
);

export default NullContent;
