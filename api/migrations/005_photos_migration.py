steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE photos (
            id SERIAL PRIMARY KEY,
            username VARCHAR(256) NOT NULL REFERENCES accounts(username),
            photo_url VARCHAR(256) NOT NULL,
            upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            place_id VARCHAR(300) UNIQUE,
            review_id INT NOT NULL REFERENCES reviews(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE photos;
        """,
    ],
]
