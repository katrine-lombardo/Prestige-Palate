steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE IF NOT EXISTS accounts (
            id SERIAL PRIMARY KEY,
            username VARCHAR(256) UNIQUE NOT NULL,
            first_name VARCHAR(256) NOT NULL,
            last_name VARCHAR(256) NOT NULL,
            email VARCHAR(256) UNIQUE NOT NULL,
            hashed_password VARCHAR(256) NOT NULL,
            profile_icon_id INT DEFAULT 1,
            FOREIGN KEY (profile_icon_id) REFERENCES icons(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ],
]
