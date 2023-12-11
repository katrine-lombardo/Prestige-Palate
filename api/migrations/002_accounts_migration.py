steps = [
    [
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
        """
        DROP TABLE accounts;
        """,
    ],
    [
        """
        INSERT INTO accounts
        (username, first_name, last_name, email, hashed_password) VALUES
        ('admin', 'Admin', 'User', 'admin@email.com', '$2b$12$aXcHj2LvRg3yAFMnCDJyXero1PBa/G/jinZ0aMyiUq.RdCURWMkKu');
        """,
        """
        """,
    ],
]
