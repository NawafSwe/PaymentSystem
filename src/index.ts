// importing packages

import {Response, Request, NextFunction, Router, Express, Application} from 'express';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const app: Application = express();

// config express app
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.json("works").status(200);
});

// config the port and host
dotenv.config();
const PORT: number = Number(process.env.PORT) || 3000;
const HOST: string = process.env.HOST || "localhost";

app.listen(PORT, HOST, async () => {
    console.log(`server running http://${HOST}:${PORT}`);
});
