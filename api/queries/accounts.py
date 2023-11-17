import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel


pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


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
    def get(self, email: str) -> AccountOutWithPassword:
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
                    print("exception")
                    return {
                        "message": "Could not get accounts record for this accounts email"
                    }

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    info.first_name,
                    info.last_name,
                    info.username,
                    info.email,
                    hashed_password,
                ]
                cur.execute(
                    """
                    INSERT INTO accounts (first_name, last_name, username, email,
                    hashed_password)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id, first_name, last_name, username, email,
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
                print(record)
                return AccountOutWithPassword(**record)
