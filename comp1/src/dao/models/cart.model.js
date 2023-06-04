import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    "products": []
})

export const cartModel = mongoose.model("carts", cartSchema);
