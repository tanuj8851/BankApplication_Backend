import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["DEPOSIT", "WITHDRAWAL", "TRANSFER"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  fromAccount: {
    type: String,
    ref: "User",
  },
  toAccount: {
    type: String,
    ref: "User",
  },
  balanceAfter: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
