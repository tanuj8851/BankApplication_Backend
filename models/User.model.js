import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  pin: { type: String, required: true },
  accountNumber: { type: String, unique: true },
  balance: { type: Number, default: 0 },
  isLocked: { type: Boolean, default: false },
  failedAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
  tokenVersion: { type: Number, default: 0 },
});

export const User = mongoose.model("User", UserSchema);
