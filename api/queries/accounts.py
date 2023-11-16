import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel

pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    email: str
    password: str
    firstname: str
    lastname: str

class AccountOut(BaseModel):
    id: str
    email: str
    firstname: str
    lastname: str

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountQueries(Queries):
    def get(self, email: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """"
                        SELECT id
                        , username
                        , hashed_password
                    FROM account
                    WHERE username =%s
                    """,
                    [username],
                    )
                    record = result.fetchone()
                    return AccountOutWithPassword(
                        id=record[0],
                        username=record[1],
                        hashed_password=record[2],
                    )
    # def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:




# From Dalonte's twoshot postgres solved:
#class AccountQueries:
    # def get_all_accounts_for_user(
    #     self, owner_id: int
    # ) -> list[AccountOut]:
    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             cur.execute(
    #                 """
    #                  SELECT *
    #                  FROM account
    #                  WHERE owner_id = %s;
    #                 """,
    #                 [owner_id],
    #             )
    #             try:
    #                 results = []
    #                 for row in cur.fetchall():
    #                     record = {}
    #                     for i, column in enumerate(cur.description):
    #                         record[column.name] = row[i]
    #                     results.append(record)
    #                 return results
    #             except Exception:
    #                 return {
    #                     "message": "Could not get account records for this owner id"
    #                 }
