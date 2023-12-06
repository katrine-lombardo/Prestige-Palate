steps = [
    [
        """
        CREATE TABLE IF NOT EXISTS follows (
            follower_username VARCHAR(256) DEFAULT NULL,
            following_username VARCHAR(256) NOT NULL,
            PRIMARY KEY (follower_username, following_username),
            FOREIGN KEY (follower_username) REFERENCES accounts(username),
            FOREIGN KEY (following_username) REFERENCES accounts(username)
        );
        """,
        """
        DROP TABLE follows;
        """,
    ],
]
