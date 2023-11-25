steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE photos (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES accounts(id),
            photo_url VARCHAR(255) NOT NULL,
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
