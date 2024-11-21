import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateAccountNumber = () => {
  return "BANK-" + Math.floor(1000000 + Math.random() * 9000000).toString();
};

export const createToken = (user) => {
  return jwt.sign(
    { id: user._id, tokenVersion: user.tokenVersion },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
};

export const sendTokenInCookie = (res, token) => {
  res.cookie("authToken", token, {
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
};
