steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE IF NOT EXISTS favorites (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES accounts(id),
            restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
            UNIQUE(user_id, restaurant_id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE favorites;
        """,
    ],
]
