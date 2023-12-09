import pytest
from fastapi.testclient import TestClient
from main import app
from routers.favorites import FavoriteQueries
from authenticator import authenticator


fake_user_data = {"id": 1, "username": "testUser"}


class FakeFavoriteQueries:
    def add_favorite(self, user_id: int, place_id: str):
        if place_id != "testPlaceId":
            raise Exception("Invalid user ID or place ID")

    def get_favorites(self, user_id: int) -> list:
        return [{"place_id": "testPlaceId"}]

    def remove_favorite(self, user_id: int, place_id: str):
        if place_id != "testPlaceId":
            raise Exception("Invalid user ID or place ID")


client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_tests():
    app.dependency_overrides[FavoriteQueries] = lambda: FakeFavoriteQueries()
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = lambda: fake_user_data
    yield
    app.dependency_overrides.clear()


def test_add_favorite():
    response = client.post("/api/restaurants/testPlaceId/favorite")
    assert response.status_code == 200


def test_list_favorites():
    response = client.get("/api/user/favorites")
    assert response.status_code == 200


def test_remove_favorite():
    response = client.delete("/api/restaurants/testPlaceId/favorite")
    assert response.status_code == 200
