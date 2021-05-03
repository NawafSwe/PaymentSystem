/**
 * @module src/index.ts
 * @description entrypoint for node application
 * @requires{Response,Request,NextFunction,Application,express,cors,helmet}
 * @requires{connect,envConfig}
 * @requires {userRoute,paymentRoute}
 */

import {Response, Request, NextFunction, Application} from 'express';
import {connect} from "./configs/db.config";
import {envConfig} from './configs/vars.config';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app: Application = express();

// config express app
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.static("docs"));
app.set('view engine', 'html');

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.render('globals');
});

// config the port and host
envConfig();
/**
 * @namespace PORT
 * @description port number
 */
const PORT: number = Number(process.env.PORT) || 3000;
/**
 * @namespace HOST
 * @description hostname
 */
const HOST: string = process.env.HOST || "localhost";

// importing routes
import {route as userRoute} from './routes/userRoute';
import {route as paymentRoute} from './routes/paymentRoute';

// user routing
app.use('/users', userRoute);
// payment routing
//user/:id/payments for restful api
app.use('/payments', paymentRoute);

// establishing connection with given host and port
app.listen(PORT, HOST, async () => {
    console.log(`server running https://${HOST}:${PORT}`);
    // connecting with mongoDB database when establishing a connection
    await connect(String(process.env.MONGO_URI));
});
