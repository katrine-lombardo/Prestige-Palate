from queries.pool import pool
from pydantic import BaseModel
from typing import List


class Error(BaseModel):
    message: str


class FollowIn(BaseModel):
    following_username: str


class FollowOut(BaseModel):
    follower_username: str
    following_username: str


class FollowQueries:
    def follow_account(self, info: FollowIn, username: str) -> FollowOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                follower_username = username
                params = [
                    follower_username,
                    info.following_username,
                ]
                cur.execute(
                    """
                    INSERT INTO follows (follower_username, following_username)
                    VALUES (%s, %s)
                    RETURNING follower_username, following_username
                    """,
                    params,
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    return FollowOut(**record)

    def unfollow_account(self, info: FollowIn, username: str) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                follower_username = username
                params = [
                    follower_username,
                    info.following_username,
                ]
                cur.execute(
                    """
                    DELETE FROM follows
                    WHERE follower_username = %s AND following_username = %s
                    RETURNING follower_username, following_username
                    """,
                    params,
                )
                return cur.rowcount > 0

    def get_followers_by_username(self, username: str) -> List[str]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT follower_username
                    FROM follows
                    WHERE following_username = %s;
                    """,
                    [username],
                )
                followers = [row[0] for row in cur.fetchall()]
                return followers

    def get_following_by_username(self, username: str) -> List[str]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT following_username
                    FROM follows
                    WHERE follower_username = %s;
                    """,
                    [username],
                )
                following = [row[0] for row in cur.fetchall()]
                return following
