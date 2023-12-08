import pytest
from fastapi.testclient import TestClient
from main import app
from routers.follow import FollowQueries
from authenticator import authenticator

fake_user_data = {"username": "testUser"}


class FakeFollowQueries:
    def follow_account(self, info: str, username: str):
        if username != "testUser" or info != "testTargetUser":
            raise Exception("Invalid username or target username")

    def unfollow_account(self, info: str, username: str):
        if username != "testUser" or info != "testTargetUser":
            raise Exception("Invalid username or target username")

    def get_followers_by_username(self, username: str):
        if username != "testTargetUser":
            return []
        return ["testUser1", "testUser2"]

    def get_following_by_username(self, username: str):
        if username != "testUser":
            return []
        return ["testTargetUser1", "testTargetUser2"]


client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_tests():
    app.dependency_overrides[FollowQueries] = lambda: FakeFollowQueries()
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: fake_user_data
    yield
    app.dependency_overrides.clear()


def test_follow_account():
    response = client.post("/api/accounts/follow/")
    assert response.status_code == 200 or response.status_code == 422


def test_unfollow_account():
    response = client.delete("/api/accounts/unfollow/")
    assert response.status_code == 200 or response.status_code == 422


def test_get_followers_by_username():
    response = client.get("/api/accounts/followers/testTargetUser")
    assert response.status_code == 200
    assert response.json() == ["testUser1", "testUser2"]


def test_get_following_by_username():
    response = client.get("/api/accounts/following/testUser")
    assert response.status_code == 200
    assert response.json() == ["testTargetUser1", "testTargetUser2"]
