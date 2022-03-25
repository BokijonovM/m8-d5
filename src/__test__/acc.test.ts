import { server } from "../server";
import supertest from "supertest";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const client = supertest(server);

describe("Testing the app endpoints", () => {
  beforeAll((done) => {
    mongoose.connect(process.env.MONGO_URL!).then(() => {
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

  it("should work", () => {
    expect(true).toBe(true);
  });
});
