steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL UNIQUE,
            username VARCHAR(256) NOT NULL REFERENCES accounts(username),
            place_id VARCHAR(300) NOT NULL,
            PRIMARY KEY (username, place_id),
            publish_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            title TEXT NOT NULL,
            text TEXT NOT NULL,
            rating FLOAT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
            photo_urls TEXT[]
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE reviews;
        """,
    ],
]
