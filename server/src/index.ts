import express, {Request, Response} from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';

import userRoute from '../api/users/user'

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json())
app.use('/api/user', userRoute)

const port = Number(process.env.PORT) || 4001;


app.get('/api', (req: Request, res: Response) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server started at ${port}`);
})