import {
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} from "./error-handlers";
import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import accRouter from "./services/accommodation/index.js";
import usersRouter from "./services/user/index.js";
import googleStrategy from "./auth/Oauth.js";
import dotenv from 'dotenv'


process.env.TS_NODE_DEV && require("dotenv").config();

export const server = express();
const port = process.env.PORT || 3001;

passport.use("google", googleStrategy);

server.use(cors());
server.use(express.json());
server.use(passport.initialize());

/************************** Routes ****************************/
server.use("/users", usersRouter);
server.use("/accommodation", accRouter);

/************************** Error Handler ****************************/
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(catchAllHandler);

if(!process.env.MONGO_CONNECTION){
  throw console.log("mongo connection is undefined");
  
}
mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log("Server runnning on port: ", port);
  });
});

server.on("error", (error) => {
  console.log("server has stopped  ", error);
});
