from queries.pool import pool
from pydantic import BaseModel
from typing import List, Optional, Union
from fastapi import HTTPException, status


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


class EditProfile(BaseModel):
    first_name: str
    last_name: str
    profile_icon_id: int


class Icon(BaseModel):
    id: int
    icon_name: str
    icon_url: str


class AccountIn(BaseModel):
    email: str
    username: str
    password: str
    first_name: str
    last_name: str


class AccountOut(BaseModel):
    id: int
    email: str
    username: str
    first_name: str
    last_name: str
    profile_icon_id: int


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class ChangePassword(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str


class AccountQueries:
    def get_all_icons(self) -> Union[Error, List[Icon]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM icons
                        ORDER BY id;
                        """
                    )
                    accounts = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        accounts.append(Icon(**record))
                    return accounts
        except Exception:
            return {"message": "Could not get all account information"}

    def get_account_by_email(
        self, email: str
    ) -> Union[Error, AccountOutWithPassword]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE email = %s;
                    """,
                    [email],
                )
                try:
                    record = None
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return AccountOutWithPassword(**record)
                except Exception:
                    return {
                        "message":
                        "Could not get accounts record for this accounts email"
                    }

    def email_exists_in_referral(self, email: str) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT COUNT(*)
                    FROM referrals
                    WHERE referred = %s;
                    """,
                    [email],
                )
                count = cur.fetchone()[0]
                return count > 0

    def create_account(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        if not self.email_exists_in_referral(info.email):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="This email is not eligible for account creation.",
            )
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    info.username,
                    info.first_name,
                    info.last_name,
                    info.email,
                    hashed_password,
                ]
                cur.execute(
                    """
                    INSERT INTO accounts (
                        username,
                        first_name,
                        last_name,
                        email,
                        hashed_password
                    )
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id, username, first_name, last_name, email,
                    hashed_password, profile_icon_id
                    """,
                    params,
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return AccountOutWithPassword(**record)

    def get_account_by_id(
        self, account_id: int
    ) -> Optional[AccountOutWithPassword]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM accounts
                    WHERE id = %s;
                    """,
                    [account_id],
                )
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return AccountOutWithPassword(**record)
                else:
                    return None

    def get_all_accounts(self) -> Union[Error, List[AccountOutWithPassword]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT *
                        FROM accounts
                        ORDER BY username;
                        """
                    )
                    accounts = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        accounts.append(AccountOutWithPassword(**record))
                    return accounts
        except Exception:
            return {"message": "Could not get all account information"}

    def delete_account(self, account_id: int) -> bool:
        if account_id == 1:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Deleting admin account not allowed.",
            )
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM accounts
                    WHERE id = %s;
                    """,
                    [account_id],
                )
                return cur.rowcount > 0

    def change_password(self, new_hashed_password, email: str):
        if email == "admin@email.com":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Password changes for admin account not allowed.",
            )
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    new_hashed_password,
                    email,
                ]
                cur.execute(
                    """
                    UPDATE accounts
                    SET hashed_password = %s
                    WHERE email = %s;
                    """,
                    params,
                )

    def edit_profile(self, email: str, edit_profile: EditProfile):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                if not (1 <= edit_profile.profile_icon_id <= 16):
                    raise ValueError(
                        "Invalid icon_id. It must be between 1 and 16."
                    )
                params = [
                    edit_profile.first_name,
                    edit_profile.last_name,
                    edit_profile.profile_icon_id,
                    email,
                ]
                cur.execute(
                    """
                    UPDATE accounts
                    SET first_name = %s,
                    last_name = %s,
                    profile_icon_id = %s
                    WHERE email = %s;
                    """,
                    params,
                )


def get_current_user_profile(
    self, account_id: int
) -> Union[Error, AccountOut]:
    with pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, first_name, last_name, profile_icon_id
                FROM accounts
                WHERE id = %s;
                """,
                [account_id],
            )
            row = cur.fetchone()
            if row is not None:
                record = {
                    column.name: row[i]
                    for i, column in enumerate(cur.description)
                }
                return AccountOut(**record)
            else:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Account not found.",
                )
