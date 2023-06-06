import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  products: {
    type: [
      {
        product: mongoose.Schema.Types.ObjectId,
        quantity: Number
      },
    ],
    default: [],
  },
});

export const cartModel = mongoose.model("carts", cartSchema);
