import { z } from 'zod';

const zUser = z.object({
    id: z.string().uuid(),
    name: z.string(),
    surname: z.string(),
    email: z.string().email(),
    username: z.string(),
    hash: z.string()
});

export const zRegisterUser = zUser.omit({ id: true });
export const zTokenUser = zRegisterUser.omit({ hash: true });

export type User = z.infer<typeof zUser>;
export type RegisterUser = z.infer<typeof zRegisterUser>;
export type TokenUser = z.infer<typeof zTokenUser>; 