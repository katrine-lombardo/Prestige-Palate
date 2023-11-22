steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            publish_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            username VARCHAR(256) NOT NULL REFERENCES accounts(username),
            text TEXT NOT NULL,
            place_id VARCHAR(300) UNIQUE,
            rating FLOAT CHECK (rating >= 1 AND rating <= 5) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE reviews;
        """,
    ],
]
