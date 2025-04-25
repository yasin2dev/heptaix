import to from "await-to-js";

import { DB } from "@server/db";
import type { User } from "@server/types";

export async function getUser(email: string): Promise<User[]> {
    const SQL = DB<User[]>`
SELECT
  *
FROM 
  "auth"."users"
WHERE "email" = ${email}
`;

    const [error4sql, result] = await to(SQL);
    if (error4sql) throw error4sql;

    return result;
}