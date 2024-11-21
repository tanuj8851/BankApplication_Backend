import express from "express";
import {
  deposit,
  withdraw,
  transfer,
  getTransactions,
} from "../controllers/transactionController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/deposit", authenticate, deposit);
router.post("/withdraw", authenticate, withdraw);
router.post("/transfer", authenticate, transfer);
router.get("/history", authenticate, getTransactions);

export default router;
