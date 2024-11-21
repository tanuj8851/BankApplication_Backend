import express from "express";
import {
  login,
  register,
  logout,
  userProfile,
} from "../controllers/authController.js";
import { authenticate } from "./../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);
router.get("/profile", authenticate, userProfile);

export default router;
