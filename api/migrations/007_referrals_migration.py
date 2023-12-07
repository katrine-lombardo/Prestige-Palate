steps = [
    [
        """
        CREATE TABLE IF NOT EXISTS referrals (
            existing_user VARCHAR(256) NOT NULL,
            referred VARCHAR(256) NOT NULL,
            PRIMARY KEY (existing_user, referred),
            FOREIGN KEY (existing_user) REFERENCES accounts(email),
            CONSTRAINT no_self CHECK (existing_user <> referred),
            CONSTRAINT unique_referred UNIQUE (referred)
        );
        """,
        """
        DROP TABLE referrals;
        """,
    ],
    [
        """
        INSERT INTO referrals (existing_user, referred) VALUES
        ('admin@email.com', 'erin_ahn@email.com'),
        ('admin@email.com', 'michael_boateng@email.com'),
        ('admin@email.com', 'katrine_lombardo@email.com'),
        ('admin@email.com', 'trey_mcgee@email.com'),
        ('admin@email.com', 'yaosheng_yin@email.com');
        """,
        """
        """,
    ],
]
