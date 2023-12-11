import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries, AccountOut, AccountOutWithPassword
from passlib.context import CryptContext


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: AccountQueries,
    ):
        return accounts.get_account_by_email(email)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: AccountOutWithPassword):
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOutWithPassword):
        return account.email, AccountOut(**account.dict())

    def verify_password(self, plain_password, hashed_password):
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        return pwd_context.verify(plain_password, hashed_password)


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
