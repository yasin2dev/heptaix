import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { listUsers } from '../../db/user/list';
import { createUser } from '../../db/user/create';
import { getUser } from '../../db/user/get';

const userRoute = Router()

userRoute.post('/register', async (req: Request, res: Response) => {
    const { name, surname, username, email, password } = req.body;
    if (!req.body) res.status(400).send("Bad Request");
    const hashedPassword: string = await bcrypt.hash(password, 12);
    createUser(name, surname, username, email, hashedPassword).catch((e) => console.error(e));
    res.status(201).json("Register Successful.");
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
                    const token = jwt.sign(u, "DENEME", {expiresIn: '1h'});
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