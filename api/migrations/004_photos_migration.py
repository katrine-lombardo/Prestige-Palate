steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE photos (
            photo_id SERIAL PRIMARY KEY,
            user_id INT REFERENCES accounts(id),
            photo_url VARCHAR(255) NOT NULL,
            upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            restaurant_id INTEGER,
            FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE photos;
        """,
    ],
]
