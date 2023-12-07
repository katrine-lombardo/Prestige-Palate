from queries.pool import pool
from pydantic import BaseModel


class Error(BaseModel):
    message: str


class ReferralIn(BaseModel):
    referred: str


class ReferralOut(BaseModel):
    existing_user: str
    referred: str


class ReferralQueries:

    def refer_email(self, info: ReferralIn, email: str) -> ReferralOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                existing_user = email
                params = [
                    existing_user,
                    info.referred,
                ]
                cur.execute(
                    """
                    INSERT INTO referral (existing_user, referred)
                    VALUES (%s, %s)
                    RETURNING existing_user, referred
                    """,
                    params,
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return ReferralOut(**record)
