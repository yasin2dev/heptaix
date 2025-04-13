import jwt, { JwtPayload, TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import type { VerifiedTokenResultError, VerifiedTokenResultSuccess } from "../../types";

type VerifiedTokenResult = VerifiedTokenResultSuccess | VerifiedTokenResultError;

export default function verifyToken(authHeader: string | undefined): VerifiedTokenResult {
  if (!authHeader) {
    return { success: false, error: "Authorization header is missing." };
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return { success: false, error: "Invalid authorization header format." };
  }

  const token = parts[1];
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    return { success: false, error: "JWT Secret Key is not defined in .env file" };
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!decoded || typeof decoded.id !== 'string') {
      return { success: false, error: "User ID not found in token." };
    }

    return {
      success: true,
      payload: decoded,
    };
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return { success: false, error: "Session has expired." };
    }

    if (err instanceof JsonWebTokenError) {
      return { success: false, error: "Invalid JWT token." };
    }

    return { success: false, error: "Token verification failed." };
  }
}