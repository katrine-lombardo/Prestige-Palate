steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE IF NOT EXISTS accounts (
            id SERIAL PRIMARY KEY,
            username VARCHAR(256) UNIQUE,
            first_name VARCHAR(256),
            last_name VARCHAR(256),
            email VARCHAR(256),
            hashed_password VARCHAR(256)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ],
]
