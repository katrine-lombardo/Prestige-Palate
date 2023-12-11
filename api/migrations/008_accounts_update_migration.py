steps = [
    [
    """
        UPDATE accounts
        SET hashed_password = '$2b$12$Kk98F1Nz7YYk92jvlqAqfeWa28BnB7AjXPQsSO.JsPHPZ6r0PBY1.'
        WHERE username = 'admin';
    """,
    """
        UPDATE accounts
        SET hashed_password = '$2b$12$aXcHj2LvRg3yAFMnCDJyXero1PBa/G/jinZ0aMyiUq.RdCURWMkKu'
        WHERE username = 'admin'
    """,
    ]
]
