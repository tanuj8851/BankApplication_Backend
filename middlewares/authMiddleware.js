import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.authToken || req.headers["authorization"];

    console.log("token", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded", decoded);

    const user = await User.findById(decoded.id);

    console.log("user", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};
