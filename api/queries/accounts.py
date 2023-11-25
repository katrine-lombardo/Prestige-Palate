from queries.pool import pool
from pydantic import BaseModel
from typing import List, Optional, Union


class Error(BaseModel):
    message: str


class DuplicateAccountError(ValueError):
    pass


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


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class ChangePassword(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str


class EditProfile(BaseModel):
    username: str
    first_name: str
    last_name: str


class AccountQueries:
    def get_account_by_email(self, email: str) -> AccountOutWithPassword:
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
                        "message": "Could not get accounts record for this accounts email"
                    }

    def create_account(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
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
                    INSERT INTO accounts (username, first_name, last_name, email,
                    hashed_password)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id, username, first_name, last_name, email,
                    hashed_password
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

    def delete_account(self, account_id: int) -> bool:
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

    def edit_profile(self, email: str, edit_profile):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    edit_profile.username,
                    edit_profile.first_name,
                    edit_profile.last_name,
                    email,
                ]
                cur.execute(
                    """
                    UPDATE accounts
                    SET username = %s,
                    first_name = %s,
                    last_name = %s
                    WHERE email = %s;
                    """,
                    params,
                )
