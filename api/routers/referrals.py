from fastapi import (
    Depends,
    APIRouter,
    HTTPException,
    status,
)
from queries.referrals import (
    ReferralQueries,
    ReferralIn,
    ReferralOut,
)
from authenticator import authenticator
from pydantic import BaseModel
from typing import Union, List


class Error(BaseModel):
    message: str


router = APIRouter()


@router.post("/api/accounts/refer/", response_model=Union[ReferralOut, Error])
async def refer_email(
    info: ReferralIn,
    accounts: ReferralQueries = Depends(),
    current_user: dict = Depends(authenticator.try_get_current_account_data),
):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not authenticated.",
        )
    try:
        result = accounts.refer_email(info, current_user["email"])
        return result
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="This email has a referral to sign up.",
        )


@router.get("/api/accounts/referred_by/{username}", response_model=List[str])
async def get_referrals_given(
    email: str,
    accounts: ReferralQueries = Depends(),
):
    followers = accounts.get_referrals_given(email)
    return followers


@router.get("/api/accounts/all_referrals/", response_model=List[ReferralOut])
async def get_all_referrals(accounts: ReferralQueries = Depends()):
    try:
        referrals = accounts.get_all_referrals()
        return referrals
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error retrieving all referrals.",
        )
