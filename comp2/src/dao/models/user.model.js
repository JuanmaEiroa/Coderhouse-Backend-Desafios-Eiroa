import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  password: String,
  age: Number,
  img: String,
  cart: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
      },
    ],
    default: [],
  },
  role: {
    type: String,
    default: "user",
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
