import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { listUsers } from '../../db/user/list';
import { createUser } from '../../db/user/create';
import { getUser } from '../../db/user/get';

const userRoute = Router()

userRoute.post('/register', async (req: Request, res: Response) => {
    if (!req.body) res.status(400).send("Bad Request");
    const hash: string = await bcrypt.hash(req.body['password'], 12);
    createUser(req.body['name'], req.body['surname'], req.body['username'], req.body['email'], hash);
    res.status(201).json("Register Successful.");
})

userRoute.post('/login', async (req: Request, res: Response) => {
    if (!req.body) res.status(400).send("Bad Request");
    getUser(req.body['email'])
        .then((data) => {
            if (!data) return res.status(404).send("User not found with this email");
            data.map(async (u) => {
                const compare = await bcrypt.compare(req.body['password'], u.hash)
                if (compare) {
                    console.log("Login success");
                }
            })
            console.log(data)
        })
        .catch((e) => console.error(e))

    res.status(200).send("LOGIN ISTEGI GELDI")
})

userRoute.get('/', (req: Request, res: Response) => {
    listUsers().then((data) => {
        if (data) res.status(200).json(data)
        else res.status(404).send('No Member in App')
    })
})

export default userRoute;