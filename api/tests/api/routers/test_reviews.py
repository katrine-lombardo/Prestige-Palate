import pytest
from fastapi.testclient import TestClient
from main import app
from routers.reviews import ReviewQueries
from authenticator import authenticator


fake_review_data = {
    "reviewId": 1,
    "username": "testUser",
    "place_id": "testPlaceId",
    "publish_time": "2023-12-07 19:07:23.859056+00",
    "title": "testTitle",
    "text": "testText",
    "rating": "testRating",
    "photo_urls": ["testPhotoUrl1", "testPhotoUrl2"],
}


class FakeReviewQueries:
    def get_google_reviews_for_restaurant(self, place_id: str):
        if place_id != "testPlaceId":
            return []
        return [{"place_id": "testPlaceId"}]

    def get_app_reviews_for_restaurant(self, place_id: str):
        if place_id != "testPlaceId":
            return []
        return [{"place_id": "testPlaceId"}]

    def create_review(self, username: str, place_id: str):
        if username != "username" or place_id != "testPlaceId":
            raise Exception("Invalid username or place ID")

    def update_review(self, username: str, review_id):
        if username != "username" or review_id != 1:
            raise Exception("Invalid username or review ID")

    def delete_review(self, username: str, review_id):
        if username != "username" or review_id != 1:
            raise Exception("Invalid username or review ID")

    def check_existing_review(self, username: str, place_id: str):
        if username != "username" or place_id != 1:
            raise Exception("Invalid username or review ID")


client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_tests():
    app.dependency_overrides[ReviewQueries] = lambda: FakeReviewQueries()
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = lambda: fake_review_data
    yield
    app.dependency_overrides.clear()


def test_get_google_reviews_for_restaurant(placeId: str):
    response = client.get("/api/restaurants/testPlaceId/googlereviews")
    assert response.status_code == 200


def test_get_app_reviews_for_restaurant(placeId: str):
    response = client.get("/api/restaurants/testPlaceId/reviews")
    assert response.status_code == 200
    assert response.json() == [{"place_id": "testPlaceId"}]


def create_review(self, username: str, placeId: str):
    response = client.post("/api/restaurants/testPlaceId/reviews")
    assert response.status_code == 200


def update_review(self, username: str, reviewId):
    response = client.put("/api/restaurants/testPlaceId/reviews/reviewId")
    assert response.status_code == 200


def delete_review(self, username: str, reviewId):
    response = client.delete("/api/restaurants/testPlaceId/reviews/reviewId")
    assert response.status_code == 200


def check_existing_review(self, placeId: str):
    response = client.get(
        "/api/restaurants/testPlaceId/reviews/check-existing"
    )
    assert response.status_code == 200
