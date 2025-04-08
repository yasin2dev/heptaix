import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { listUsers } from '../../db/user/list';
import { createUser } from '../../db/user/create';
import { getUser } from '../../db/user/get';
import { zRegisterUser } from '../../types';
import { ZodError } from 'zod';

const userRoute = Router()

userRoute.post('/register', async (req: Request, res: Response) => {
    try {
        const { name, surname, username, email, password } = req.body;
        if (!name && !surname && !username && !email && !password) res.status(400).send("Bad Request");
        const hashedPassword: string = await bcrypt.hash(password, 12);
        // TODO: Declared but never used. Zod validation system messages added. eg. invalid email
        const validation = zRegisterUser.parse({ name: name, surname: surname, username: username, email: email, hash: hashedPassword });
        console.log(validation.email);
        createUser(name, surname, username, email, hashedPassword).then(() => res.status(201).send("Register Successful."));
    } catch (e) {
        if (e instanceof ZodError) {
            const emailError = e.issues.filter((issue) => issue.message === "Invalid email");
            if (emailError.length > 0) {
                res.send("Invalid email format.");
            }
        }
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
            console.log(data)
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