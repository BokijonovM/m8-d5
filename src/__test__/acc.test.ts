import { server } from "../server";
import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const client = supertest(server);

describe("Testing the chat endpoints", () => {
  beforeAll((done) => {
    // console.log(process.env.MONGO_URL_TEST)
    mongoose.connect(process.env.MONGO_URL_TEST!).then(() => {
      console.log("Connected to Mongo DB in test...");
      done();
    });
  });

  afterAll((done) => {
    mongoose.connection
      .dropDatabase()
      .then(() => {
        return mongoose.connection.close();
      })
      .then(() => {
        console.log("Dropped database and closed connection");
        done();
      });
  });
});
