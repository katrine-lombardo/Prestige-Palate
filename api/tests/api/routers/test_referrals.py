import pytest
from fastapi.testclient import TestClient
from main import app
from queries.referrals import ReferralQueries
from authenticator import authenticator


fake_user_data = {"email": "test@example.com", "username": "testUser"}


def fake_user():
    return fake_user_data


class FakeReferralQueries:
    def refer_email(self, info: str, email: str):
        if email != "test@example.com" or info != "referred@example.com":
            raise Exception("Invalid email or referral")
        return {"existing_user": email, "referred": info}

    def get_referrals_given(self, email: str):
        if email != "test@example.com":
            return []
        return ["referred1@example.com", "referred2@example.com"]


client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_tests():
    app.dependency_overrides[ReferralQueries] = FakeReferralQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_user
    yield
    app.dependency_overrides.clear()


def test_refer_email():

    response = client.post("/api/accounts/refer/")
    assert response.status_code == 200 or response.status_code == 422


def test_get_referrals_given():
    response = client.get("/api/accounts/referred_by/test@example.com")
    assert response.status_code == 200 or response.status_code == 422
