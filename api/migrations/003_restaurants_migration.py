steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE IF NOT EXISTS restaurants (
            id SERIAL PRIMARY KEY,
            place_id VARCHAR(300) UNIQUE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE restaurants;
        """,
    ],
]
