from fastapi import (
    Depends,
    APIRouter,
)
from queries.referrals import (
    ReferralQueries,
    ReferralIn,
    ReferralOut,
)
from authenticator import authenticator
from pydantic import BaseModel
from typing import Union

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
    except Exception as e:
        return {"message": f"Error: {str(e)}"}
