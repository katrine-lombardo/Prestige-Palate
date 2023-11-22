from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from queries.accounts import (
    AccountIn,
    AccountOut,
    AccountOutWithPassword,
    AccountQueries,
    DuplicateAccountError,
    ChangePassword,
    EditProfile,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from typing import Union, List, Optional


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


class Error(BaseModel):
    message: str


router = APIRouter()


@router.get("/api/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create_account(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


@router.get("/api/accounts/{account_id}", response_model=AccountOut)
async def get_account_by_id(
    account_id: int,
    response: Response,
    accounts: AccountQueries = Depends(),
) -> AccountOut:
    account = accounts.get_account_by_id(account_id)
    if account is None:
        response.status_code = 404
    return account


@router.patch("/api/accounts/{account_id}/change-password/")
async def change_password(
    change_password: ChangePassword,
    current_account_data: dict = Depends(
        authenticator.try_get_current_account_data
    ),
    queries: AccountQueries = Depends(),
):
    if current_account_data is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not authenticated.",
        )
    email = current_account_data.get("email")
    # Retrieve the hashed password from the database based on the email
    current_account = queries.get_account_by_email(email)
    if current_account is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )
    # Verify current password
    valid = authenticator.verify_password(
        change_password.current_password, current_account.hashed_password
    )
    if not valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect current password.",
        )
    # Check new password and confirm password
    if change_password.new_password != change_password.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Password confirmation does not match the new password.",
        )
    # Change password
    hashed_password = authenticator.hash_password(change_password.new_password)
    queries.change_password(hashed_password, email)
    return {
        "status_code": status.HTTP_200_OK,
        "detail": "Password successfully updated.",
    }


@router.patch("/api/accounts/{account_id}/edit-profile")
async def edit_profile(
    edit_profile: EditProfile,
    current_user_data: dict = Depends(
        authenticator.try_get_current_account_data
    ),
    queries: AccountQueries = Depends(),
):
    email = current_user_data["email"]
    queries.edit_profile(email, edit_profile)
    return {
        "status_code": status.HTTP_200_OK,
        "detail": "Account details updated successfully.",
    }


@router.delete("/api/accounts/{account_id}/delete", response_model=bool)
async def delete_account(
    account_id: int,
    accounts: AccountQueries = Depends(),
) -> bool:
    return accounts.delete_account(account_id)
