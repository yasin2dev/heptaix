import { UUID } from "crypto";

export type User = {
    id: UUID,
    name: string,
    surname: string,
    email: string,
    username: string,
    hash: string,
}

export type RegisterUser = Omit<User, "id">;
export type TokenUser = Omit<User, "hash">;