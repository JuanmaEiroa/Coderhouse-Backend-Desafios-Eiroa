import mongoose from "mongoose";

function codeGenerator() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 10; i++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    code += chars.charAt(randIndex);
  }

  return code;
}

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
    default: codeGenerator(),
  },
  purchase_datetime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  amount: Number,
  purchaser: {
    type: String,
    required: true,
  }
});

const ticketModel = mongoose.model("tickets", ticketSchema);
export default ticketModel;
