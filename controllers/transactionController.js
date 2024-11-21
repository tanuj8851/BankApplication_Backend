import { User } from "../models/User.model.js";
import { Transaction } from "../models/Transaction.model.js";
import bcrypt from "bcryptjs";

//deposit controller
export const deposit = async (req, res) => {
  try {
    const { amount, pin } = req.body;
    const user = req.user;
    let wholeAmount = Number(amount);

    if (!wholeAmount || wholeAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid PIN" });
    }

    user.balance += wholeAmount;
    await user.save();

    const transaction = new Transaction({
      type: "DEPOSIT",
      amount: wholeAmount,
      toAccount: user.accountNumber,
      balanceAfter: user.balance,
    });
    await transaction.save();

    res.json({
      message: "Deposit successful",
      balance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.log(error.message);
  }
};

//withdraw controller
export const withdraw = async (req, res) => {
  try {
    const { amount, pin } = req.body;
    const user = req.user;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid PIN" });
    }

    if (user.balance < +amount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    user.balance -= +amount;
    await user.save();

    const transaction = new Transaction({
      type: "WITHDRAWAL",
      amount,
      fromAccount: user.accountNumber,
      balanceAfter: user.balance,
    });
    await transaction.save();

    res.json({
      message: "Withdrawal successful",
      balance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

//transfer controller
export const transfer = async (req, res) => {
  try {
    const { toAccount, amount, pin } = req.body;
    const fromUser = req.user;
    let wholeAmount = Number(amount);

    if (!wholeAmount || wholeAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const isMatch = await bcrypt.compare(pin, fromUser.pin);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid PIN" });
    }

    const toUser = await User.findOne({ accountNumber: toAccount });
    if (!toUser) {
      return res.status(404).json({ error: "Recipient account not found" });
    }

    if (fromUser.balance < wholeAmount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    fromUser.balance -= wholeAmount;
    toUser.balance += wholeAmount;

    await fromUser.save();
    await toUser.save();

    const transaction = new Transaction({
      type: "TRANSFER",
      amount: wholeAmount,
      fromAccount: fromUser.accountNumber,
      toAccount: toUser.accountNumber,
      balanceAfter: fromUser.balance,
    });
    await transaction.save();

    res.json({
      message: "Transfer successful",
      balance: fromUser.balance,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

//getTransactions controller
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [
        { fromAccount: req.user.accountNumber },
        { toAccount: req.user.accountNumber },
      ],
    }).sort({ timestamp: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
