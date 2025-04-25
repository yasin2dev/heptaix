import { TokenUser } from "../../../server/types";

export type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string, user: string) => void;
  logout: () => void;
  user: TokenUser | undefined;
};