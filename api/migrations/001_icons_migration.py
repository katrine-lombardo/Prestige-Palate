steps = [
    [
        """
        CREATE TABLE IF NOT EXISTS icons (
            id SERIAL PRIMARY KEY,
            icon_name VARCHAR(50) NOT NULL,
            icon_url VARCHAR(256) NOT NULL
        );
        """,
        """
        DROP TABLE IF EXISTS icons;
        """,
    ],
    [
        """
        INSERT INTO icons (icon_name, icon_url) VALUES
        ('Default', 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png'),
        ('Lobster', 'https://cdn-icons-png.flaticon.com/512/10224/10224125.png?ga=GA1.1.161371894.1701626167'),
        ('Turkey', 'https://cdn-icons-png.flaticon.com/512/12612/12612258.png?ga=GA1.1.161371894.1701626167'),
        ('Onigiri', 'https://cdn-icons-png.flaticon.com/512/411/411030.png?ga=GA1.1.161371894.1701626167'),
        ('Bread', 'https://cdn-icons-png.flaticon.com/512/411/411000.png?ga=GA1.1.161371894.1701626167'),
        ('Shrimp', 'https://cdn-icons-png.flaticon.com/512/411/411026.png?ga=GA1.1.161371894.1701626167'),
        ('Cake', 'https://cdn-icons-png.flaticon.com/512/411/411013.png?ga=GA1.1.161371894.1701626167'),
        ('Egg', 'https://cdn-icons-png.flaticon.com/512/411/411004.png?ga=GA1.1.161371894.1701626167'),
        ('Beer', 'https://cdn-icons-png.flaticon.com/512/410/410993.png?ga=GA1.1.161371894.1701626167'),
        ('Fries', 'https://cdn-icons-png.flaticon.com/512/411/411010.png?ga=GA1.1.161371894.1701626167'),
        ('Grapes', 'https://cdn-icons-png.flaticon.com/512/411/411023.png?ga=GA1.1.161371894.1701626167'),
        ('OJ', 'https://cdn-icons-png.flaticon.com/512/410/410995.png?ga=GA1.1.161371894.1701626167'),
        ('Corn', 'https://cdn-icons-png.flaticon.com/512/12612/12612251.png?ga=GA1.1.161371894.1701626167'),
        ('Boba', 'https://cdn-icons-png.flaticon.com/512/12690/12690490.png?ga=GA1.1.161371894.1701626167'),
        ('Donut', 'https://cdn-icons-png.flaticon.com/512/12751/12751656.png?ga=GA1.1.161371894.1701626167'),
        ('Hotdog', 'https://cdn-icons-png.flaticon.com/512/411/411031.png?ga=GA1.1.161371894.1701626167');        
        """,
        """
        """,
    ],
]
