import pytest
from fastapi.testclient import TestClient
from main import app
from queries.photos import PhotoQueries, PhotoOut
from authenticator import authenticator

fake_user_data = {"id": 1, "username": "testUser"}


from typing import List


class FakePhotoQueries:
    def __init__(self):
        self.fake_user_photos = {
            "testUser": [{"url": "photo1.jpg"}, {"url": "photo2.jpg"}],
        }

        self.fake_restaurant_photos = {
            "testPlaceId": [
                {"url": "restaurant_photo1.jpg"},
                {"url": "restaurant_photo2.jpg"},
            ],
        }

    def get_photos_by_username(self, username: str) -> List[PhotoOut]:
        fake_data = self.fake_user_photos.get(username, [])
        return [
            PhotoOut(
                username=username,
                photo_urls=[data["url"] for data in fake_data],
            )
        ]

    def get_photos_by_restaurant(self, place_id: str) -> List[PhotoOut]:
        fake_data = self.fake_restaurant_photos.get(place_id, [])
        return [
            PhotoOut(
                username="fake_user",
                photo_urls=[data["url"] for data in fake_data],
            )
        ]


client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_tests():
    app.dependency_overrides[PhotoQueries] = lambda: FakePhotoQueries()
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = lambda: fake_user_data
    yield
    app.dependency_overrides.clear()


def test_get_photos_by_username():
    response = client.get("/api/photos/testUser")
    assert response.status_code == 200 or response.status_code == 404


def test_get_photos_by_restaurant():
    response = client.get("/api/photos/restaurant/testPlaceId")
    assert response.status_code == 200 or response.status_code == 404
