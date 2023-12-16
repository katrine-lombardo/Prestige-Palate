from fastapi import Request
from fastapi.middleware.base import BaseHTTPMiddleware


class TrailingSlashMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.url.path.endswith("/"):
            request.url = request.url.copy_with(
                path=request.url.path.rstrip("/")
            )

        response = await call_next(request)
        return response
