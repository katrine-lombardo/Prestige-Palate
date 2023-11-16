steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            publish_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            author INT REFERENCES accounts(id),
            user_icon VARCHAR(128),
            text TEXT,
            restaurant_id INT REFERENCES restaurants(id),
            rating FLOAT CHECK (rating >= 1 AND rating <= 5),
            photo_id INT,
            FOREIGN KEY (photo_id) REFERENCES photos(photo_id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE reviews;
        """,
    ],
]
