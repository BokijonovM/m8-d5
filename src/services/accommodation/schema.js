import mongoose from "mongoose";

const { Schema, model } = mongoose;

const accommodationSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    maxGuests: { type: Number, required: true }, 
    host: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

// accommodationSchema.static("findAccommodationWithUser", async function (mongoQuery) {
//   const total = await this.countDocuments(mongoQuery.criteria);
//   const posts = await this.find(mongoQuery.criteria)
//     .limit(mongoQuery.options.limit)
//     .skip(mongoQuery.options.skip)
//     .sort(mongoQuery.options.sort)
//     .populate({
//       path: "user",
//       select: "firstName lastName",
//     });
//   return { total, posts };
// });

export default model("Accommodation", accommodationSchema);
