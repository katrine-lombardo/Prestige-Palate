steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE IF NOT EXISTS restaurants (
            id SERIAL PRIMARY KEY,
            google_place_id VARCHAR(128) UNIQUE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE restaurants;
        """,
    ],
]
