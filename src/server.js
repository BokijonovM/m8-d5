import {
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} from "./error-handlers.js";
import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import accRouter from "./services/accommodation/index.js"
import usersRouter from "./services/user/index.js";
import googleStrategy from "./auth/Oauth.js";

const server = express();
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
