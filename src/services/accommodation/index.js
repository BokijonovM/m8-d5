import express from "express";
import createHttpError from "http-errors";
import AccommodationModel from "./schema.js";
import q2m from "query-to-mongo";
import { JWTAuthMiddleware } from "../../auth/JWTAuthMiddleware.js";
import { hostMiddleware } from "../../auth/hostMiddleware.js";

const accRouter = express.Router();

accRouter.post("/", JWTAuthMiddleware, hostMiddleware,  async (req, res, next) => {
  try {
    
    const newAcc = { ...req.body, host:req.user._id}
    const savedAcc = new AccommodationModel(newAcc);
    const { _id } = await savedAcc.save();
    res.status(201).send(newAcc);
  } catch (error) {
    next(error);
  }
});

accRouter.get("/",  JWTAuthMiddleware, hostMiddleware, async (req, res, next) => {
  try {
    console.log(req.headers)
    const accommodation = await AccommodationModel.find({host: req.user._id});
    res.send(accommodation);
  } catch (error) {
    next(error);
  }
});

accRouter.get("/:id", JWTAuthMiddleware, hostMiddleware, async (req, res, next) => {
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

accRouter.put("/:id",JWTAuthMiddleware, hostMiddleware, async (req, res, next) => {
  try {
    const accId = req.params.id;
    const accommodation = await AccommodationModel.findById(accId)
    if (accommodation) {
      if(accommodation.host === req.user._id){
        const updatedAcc = await AccommodationModel.findByIdAndUpdate(
          accId,
          req.body,
          { new: true }
          );
            res.send(updatedAcc);
          } else {
            next(createHttpError(403, "you are not authorised to edit this property"))
          }
      } else {
        res.status(404).send(`Accommodation with id ${accId} not found!`);
      }
  } catch (error) {
    next(error);
  }
});

accRouter.delete("/:id", JWTAuthMiddleware, hostMiddleware, async (req, res, next) => {
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