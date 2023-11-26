import os
import requests
from queries.pool import pool


def get_google_place_details(google_place_id):
    api_key = os.environ["GOOGLE_API_KEY"]
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={google_place_id}&key={api_key}"

    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None


def update_place_details_in_db(google_place_id, details):
    with pool.connection() as conn:
        with conn.cursor() as cur:
            update_query = """
            UPDATE restaurants 
            WHERE google_place_id = %s;
            """
            cur.execute(update_query, [google_place_id])


def update_google_place_details():
    with pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
            SELECT DISTINCT r.google_place_id 
            FROM favorites f 
            JOIN restaurants r ON f.restaurant_id = r.id;
            """
            )
            place_ids = [row[0] for row in cur.fetchall()]

    for google_place_id in place_ids:
        details = get_google_place_details(google_place_id)
        if details:
            update_place_details_in_db(google_place_id, details)


if __name__ == "__main__":
    update_google_place_details()
