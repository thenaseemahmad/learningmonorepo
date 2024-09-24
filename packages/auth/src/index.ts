import express from "express";
import "dotenv/config";
import cookieSession from "cookie-session";
import morgan from "morgan";
import bodyParser from "body-parser";
import { signupRouter } from "./routers/signup";
import { singinRouter } from "./routers/signin";
import { currentuserRouter } from "./routers/currentuser";
import errorHandler from "./middlewares/errorHandler";
import mongoose from "mongoose";
import { natsClient } from "./events/nats-client";

const app = express();
app.set("trust proxy", true);
app.use(bodyParser.json());
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' }));
app.use(morgan('common'));
const authPort = 4000;

app.use(signupRouter);
app.use(singinRouter);
app.use(currentuserRouter);
app.use(signupRouter);
app.use(errorHandler);

async function start() {
  //make connection with mongodb here
  await mongoose.connect('mongodb+srv://japsinnaseem:d6yizx712YKp2eTt@cluster0.c9xlloe.mongodb.net/auth?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
      console.log("Connected to MONGODB successfully")
    })
    .catch((err) => {
      console.log(`Unable to make MONGODB connection
        ERROR: ${err}`)

    });
  await natsClient.connect('Ticketing', 'abc', 'http://localhost:4222');
  app.listen(authPort, () => {
    console.log(`AUTH SERVICE started listening on ${authPort}`)
  });
  //start listening to auth service if connection is successfull
}

start();