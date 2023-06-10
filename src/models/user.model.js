const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: "enter you email!",
    },
    firstName: {
      type: String,
      required: "first name is required!",
    },
    lastName: {
      type: String,
      required: "lsst name is required!",
    },
    password: {
      type: String,
      required: "enter strong passowrd",
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
