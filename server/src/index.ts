import express, {Request, Response} from 'express'; 
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoute from '../api/users/user'
import todoRouter from '../api/todo/todo';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: '100kb' }));
app.use('/api/user', userRoute)
app.use('/api/todo', todoRouter)

const port = Number(process.env.PORT) || 4001;


app.get('/api', (req: Request, res: Response) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server started at ${port}`);
})