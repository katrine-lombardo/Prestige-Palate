steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE IF NOT EXISTS favorites (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES accounts(id),
            place_id VARCHAR(300) UNIQUE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE favorites;
        """,
    ],
]
