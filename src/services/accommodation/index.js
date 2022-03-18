import express from "express";
import createHttpError from "http-errors";
import AccommodationModel from "./schema.js";
import q2m from "query-to-mongo";

const accRouter = express.Router();

accRouter.post("/", async (req, res, next) => {
  try {
    const newAcc = new AccommodationModel({
      ...req.body,
    });
    const { _id } = await newAcc.save();
    res.status(201).send(newAcc);
  } catch (error) {
    next(error);
  }
});

accRouter.get("/", async (req, res, next) => {
  try {
    const accommodation = await AccommodationModel.find();
    res.send(accommodation);
  } catch (error) {
    next(error);
  }
});

export default accRouter;
