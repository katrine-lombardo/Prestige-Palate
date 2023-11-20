import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel
from typing import List, Optional, Union


pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


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
    id: str
    email: str
    username: str
    first_name: str
    last_name: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


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

    def update_account(
        self, account_id: int, account: AccountIn, hashed_password: str
    ) -> Union[AccountOutWithPassword, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    params = [
                        account_id,
                        account.username,
                        account.first_name,
                        account.last_name,
                        account.email,
                        hashed_password,
                    ]
                    cur.execute(
                        """
                        UPDATE accounts
                        SET username = %s
                        , first_name = %s
                        , last_name = %s
                        , email = %s
                        , hashed_password = %s
                        WHERE id = %s
                        RETURNING id, first_name, last_name, username, email,
                        hashed_password
                        """,
                        params,
                    )
                    row = cur.fetchone()
                    if row is not None:
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        return AccountOutWithPassword(**record)
                    else:
                        return None
                    # return self.account_in_to_out(account_id, account)
        except Exception as e:
            return {"message": "Could not update account details"}

    # def account_in_to_out(self, id: int, account: AccountIn):
    #     old_data = account.dict()
    #     return AccountOut(id=id, **old_data)
