import mongoose from "mongoose";
import { AccomodationModel, DbAccomodation } from "./schemaInterface";

const { Schema, model } = mongoose;

const AccomodationSchema = new Schema<DbAccomodation>(
  {
    name: {
      type: String,
      required: true,
    },
    maxGuests: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    host: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default model<DbAccomodation, AccomodationModel>(
  "Accomodation",
  AccomodationSchema
);
