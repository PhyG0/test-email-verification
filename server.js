import express from "express";
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
//to start/init the env file across project
import dotenv from 'dotenv';
import corsOptions from './config/corsOptions.js';
// for __filename and __dirname paths
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import verifyJWS from './middleware/verifyJWS.js';
//for api routing
import apiRouter from './routers/routeAPI.js';
import userRouter from './routers/routeUser.js';
import authRouter from './routers/authRouter.js';
import connectDB from './config/dbConn.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // root directory

dotenv.config();

const app = express();
app.use(cookieParser());

connectDB();

const PORT = process.env.PORT || 5500;

//to parse the request body to json
app.use(express.json());
app.use(bodyParser.json());

app.use(cors(corsOptions));
//to make everything in public folder accessbile
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
    res.status(200).json({ 'message' : 'Api Up and running' });
});

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.use(verifyJWS);
app.use('/api', apiRouter);

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, './public/404.html'));
}); 

//start the server at specified port
mongoose.connection.once('open', () => {
    //connected to mongooseDB
    ("Connected to DB");
    app.listen(PORT, () => { console.log(`server running on : http:localhost/${PORT}`) });
});
