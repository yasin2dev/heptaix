import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { listUsers, createUser, getUser } from '@server/db';
import { zRegisterUser } from '@server/types';
import { catchZodError, zodErrorMessages } from '@common/helpers';

const userRoute = Router()

userRoute.post('/register', async (req: Request, res: Response) => {
    try {
        const { name, surname, username, email, password } = req.body;
        if (!name && !surname && !username && !email && !password) res.status(400).send("Bad Request");
        const hashedPassword: string = await bcrypt.hash(password, 12);
        const validation = zRegisterUser.parse({ name: name, surname: surname, username: username, email: email, hash: hashedPassword });
        if (validation) {
          createUser(name, surname, username, email, hashedPassword).then(() => res.status(201).send("Register Successful."));
        }
    } catch (e) {
        if (!catchZodError(e, zodErrorMessages.email)) res.send("Invalid email format.");
    }
})

userRoute.post('/login', async (req: Request, res: Response) => {
    if (!req.body) res.status(400).send("Bad Request");
    const { email, password } = req.body;
    getUser(email)
        .then((data) => {
            if (!data || data.length <= 0) return res.status(401).send("User credentials is not true");
            data.map(async (u) => {
                const compare = await bcrypt.compare(password, u.hash)
                if (compare) {
                    const jwtSecret = process.env.JWT_SECRET_KEY;
                    if (!jwtSecret) throw new Error("JWT Secret Key is not defined in .env file");
                    const token = jwt.sign(u, jwtSecret, { expiresIn: '1h' });
                    res.status(200).json({ id: u.id, name: u.name, surname: u.surname, username: u.username, email: u.email, token: token });
                } else {
                    res.status(401).send("User credentials is not true")
                }
            })
        })
        .catch((e) => console.error(e))
})

userRoute.get('/', (req: Request, res: Response) => {
    listUsers().then((data) => {
        if (data) res.status(200).json(data)
        else res.status(404).send('No Member in App')
    });
})

export default userRoute;