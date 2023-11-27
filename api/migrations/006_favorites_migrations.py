steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE IF NOT EXISTS favorites (
            user_id INT NOT NULL,
            place_id VARCHAR(300),
            PRIMARY KEY (user_id, place_id),
            FOREIGN KEY (user_id) REFERENCES accounts(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE favorites;
        """,
    ],
]
