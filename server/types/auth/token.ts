import { JwtPayload } from "jsonwebtoken";

export type VerifiedTokenResultSuccess = {
  success: true;
  payload: JwtPayload;
}

export type VerifiedTokenResultError = {
  success: false;
  error: string;
}