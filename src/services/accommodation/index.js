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

accRouter.get("/:id", async (req, res, next) => {
  try {
    const accId = req.params.id;

    const acc = await AccommodationModel.findById(accId);
    if (acc) {
      res.send(acc);
    } else {
      res.status(404).send(`Accommodation with id ${accId} not found!`);
    }
  } catch (error) {
    next(error);
  }
});

accRouter.put("/:id", async (req, res, next) => {
  try {
    const accId = req.params.id;
    const updatedAcc = await AccommodationModel.findByIdAndUpdate(
      accId,
      req.body,
      {
        new: true,
      }
    );
    if (updatedAcc) {
      res.send(updatedAcc);
    } else {
      res.status(404).send(`Accommodation with id ${accId} not found!`);
    }
  } catch (error) {
    next(error);
  }
});

accRouter.delete("/:id", async (req, res, next) => {
  try {
    const accId = req.params.id;
    const deletedAcc = await AccommodationModel.findByIdAndDelete(accId);
    if (deletedAcc) {
      res.status(204).send(`Accommodation with id ${accId} deleted!`);
    } else {
      res.status(404).send(`Accommodation with id ${accId} not found!`);
    }
  } catch (error) {
    next(error);
  }
});

export default accRouter;
