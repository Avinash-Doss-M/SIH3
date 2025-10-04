from dataclasses import dataclass
import os

import jwt
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions


@dataclass
class SupabaseUser:
    id: str
    email: str | None
    role: str | None

    @property
    def is_authenticated(self) -> bool:  # pragma: no cover - simple property
        return True


class SupabaseJWTAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        print(f"[SupabaseJWT] Incoming Authorization: {auth_header}")
        if not auth_header or not auth_header.startswith("Bearer "):
            print("[SupabaseJWT] No Bearer token found")
            return None

        token = auth_header.split(" ")[1]
        try:
            secret = os.getenv("SUPABASE_ANON_KEY")
            if not secret:
                print("[SupabaseJWT] Supabase anon key not configured")
                raise exceptions.AuthenticationFailed("Supabase anon key not configured")

            payload = jwt.decode(token, secret, algorithms=["HS256"], options={"verify_signature": False})
            print(f"[SupabaseJWT] Decoded payload: {payload}")
            user_id = payload.get("sub") or payload.get("user_id")
            if not user_id:
                print("[SupabaseJWT] Supabase token missing subject")
                raise exceptions.AuthenticationFailed("Supabase token missing subject")

            user = SupabaseUser(
                id=user_id,
                email=payload.get("email"),
                role=payload.get("role") or payload.get("user_role"),
            )
            print(f"[SupabaseJWT] Authenticated user: {user}")
            return (user, payload)
        except exceptions.AuthenticationFailed:
            print("[SupabaseJWT] Authentication failed")
            raise
        except Exception as exc:  # pragma: no cover - pass-through for debugging
            print(f"[SupabaseJWT] Invalid token: {exc}")
            raise exceptions.AuthenticationFailed(f"Invalid token: {exc}")
