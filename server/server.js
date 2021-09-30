import express from 'express';
const app = express();
import { port_no } from './config';
import router from './routes';
import connection from './database/connection';
import cors from 'cors';

connection();

app.use(cors());

app.use(express.json());

app.use('/api',router);



app.listen(port_no,()=>console.log(`Listening on port no ${port_no}`));