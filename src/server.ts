import 'reflect-metadata';
import express from 'express';
import routes from './routes/index';
import './database/connection';
import cors from 'cors';

const app = express();

app.use(cors())

app.use(express.json());

app.use(routes);
console.log("starting server")

app.listen(3333);
