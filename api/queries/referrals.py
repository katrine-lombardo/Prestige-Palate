from queries.pool import pool
from pydantic import BaseModel
from typing import List


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
                    INSERT INTO referrals (existing_user, referred)
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

    def get_referrals_given(self, email: str) -> List[str]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT referred
                    FROM referrals
                    WHERE existing_user = %s;
                    """,
                    [email],
                )
                referred = [row[0] for row in cur.fetchall()]
                return referred
