import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;
const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["host", "guest"], default: "guest" },
  },
  {
    timestamps: true,
  }
);
//  hashing the password
UserSchema.pre("save", async function (next) {
  const newUser = this;
  const plainPw = newUser.password;

  if (newUser.isModified("password")) {
    const hash = await bcrypt.hash(plainPw, 12);
    newUser.password = hash;
  }
  next();
});

// hide the password from the response
UserSchema.methods.toJSON = function () {
  const userDocument = this;
  const userObject = userDocument.toObject();
  delete userObject.password;
  return userObject;
};

// checking the credentials email and password
UserSchema.statics.checkCredentials = async function (email, plainPw) {
  const user = await this.findOne({ email });
  if (user) {
    const isMatched = await bcrypt.compare(plainPw, user.password);
    const result = isMatched ? user : null;
    return result;
  } else null;
};

export default model("User", UserSchema);
