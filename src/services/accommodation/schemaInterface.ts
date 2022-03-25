import { ObjectId, Document, Model } from "mongoose";

export interface Accomodation {
  name: string;
  maxGuests: number;
  city: string;
  description: string;
  host: ObjectId;
  timestamps: number;
}

export interface DbAccomodation extends Document, Accomodation {}

export interface AccomodationModel extends Model<DbAccomodation> {}
