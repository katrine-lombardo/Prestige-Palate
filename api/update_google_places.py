import requests
import requests_cache
import os


def setup_cache():
    requests_cache.install_cache(
        "google_api_cache", backend="sqlite", expire_after=86400
    )


def get_google_place_details(google_place_id):
    setup_cache()
    api_key = os.environ["GOOGLE_API_KEY"]
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={google_place_id}&key={api_key}"
    response = requests.get(url)
    return response.json()
