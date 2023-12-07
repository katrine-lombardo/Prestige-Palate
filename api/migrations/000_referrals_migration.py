steps = [
    [
        """
        CREATE TABLE IF NOT EXISTS referral (
            referrer VARCHAR(256) DEFAULT NULL,
            referred VARCHAR(256) NOT NULL,
            PRIMARY KEY (referrer, referred),
            FOREIGN KEY (referrer) REFERENCES accounts(email),
            FOREIGN KEY (referred) REFERENCES accounts(email),
            CONSTRAINT no_self CHECK (referrer <> referred),
            CONSTRAINT unique_referred UNIQUE (referred)
        );
        """,
        """
        DROP TABLE referral;
        """,
    ],
]
