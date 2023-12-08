from unittest.mock import MagicMock
import pytest
from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountOutWithPassword, AccountQueries
from authenticator import authenticator

fake_user_data = {
    "id": 1,
    "email": "test@example.com",
    "username": "testUser",
    "first_name": "Test",
    "last_name": "User",
    "profile_icon_id": 1,
    "hashed_password": "$2b$12$aXc",
}

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_tests():
    mock_account_queries = MagicMock(spec=AccountQueries)
    app.dependency_overrides[authenticator.verify_password] = (
        lambda plain, hashed: plain == "correct_password"
    )
    mock_account_queries.get_all_accounts.return_value = [
        AccountOutWithPassword(**fake_user_data)
    ]
    mock_account_queries.get_account_by_id.return_value = (
        AccountOutWithPassword(**fake_user_data)
    )
    mock_account_queries.create_account.return_value = AccountOutWithPassword(
        **fake_user_data
    )
    mock_account_queries.delete_account.return_value = True

    app.dependency_overrides[AccountQueries] = lambda: mock_account_queries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = lambda: fake_user_data
    app.dependency_overrides[authenticator.verify_password] = (
        lambda plain, hashed: plain == "newPassword"
    )
    app.dependency_overrides[
        AccountQueries.get_account_by_email
    ] = lambda email: {
        "id": 1,
        "email": "test@example.com",
        "username": "testUser",
        "first_name": "Test",
        "last_name": "User",
        "profile_icon_id": 1,
        "hashed_password": authenticator.hash_password("correct_password"),
    }
    yield
    app.dependency_overrides.clear()


def test_get_all_accounts():
    response = client.get("/api/accounts")
    assert response.status_code == 200
    assert response.json() == [AccountOutWithPassword(**fake_user_data).dict()]


def test_get_account_by_id():
    response = client.get(f"/api/accounts/{fake_user_data['id']}")
    assert response.status_code == 200
    expected_data = AccountOutWithPassword(**fake_user_data).dict()
    expected_data.pop("hashed_password", None)
    assert response.json() == expected_data


def test_delete_account():
    response = client.delete(f"/api/accounts/{fake_user_data['id']}")
    assert response.status_code == 200
    assert response.json() is True


def test_get_protected():
    mock_account_data = {
        "id": 1,
        "email": "test@example.com",
        "username": "testUser",
        "first_name": "Test",
        "last_name": "User",
        "profile_icon_id": 1,
    }

    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = lambda: mock_account_data
    response = client.get("/api/protected")
    assert response.status_code == 200
    assert response.json() is True
    app.dependency_overrides.clear()
