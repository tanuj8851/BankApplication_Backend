import express from "express";
import {
  deposit,
  withdraw,
  transfer,
  getTransactions,
} from "../controllers/transactionController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction-related routes
 */

// Deposit || METHOD POST
/**
 * @swagger
 * /api/transactions/deposit:
 *   post:
 *     summary: Deposit money into the user's account
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount to deposit
 *               pin:
 *                 type: string
 *                 description: User's PIN
 *     responses:
 *       200:
 *         description: Deposit successful
 *       400:
 *         description: Invalid amount or other validation error
 *       401:
 *         description: Invalid PIN or unauthorized
 *       500:
 *         description: Server error
 */
router.post("/deposit", authenticate, deposit);

// Withdraw || METHOD POST
/**
 * @swagger
 * /api/transactions/withdraw:
 *   post:
 *     summary: Withdraw money from the user's account
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount to withdraw
 *               pin:
 *                 type: string
 *                 description: User's PIN
 *     responses:
 *       200:
 *         description: Withdrawal successful
 *       400:
 *         description: Invalid amount, insufficient funds, or other validation error
 *       401:
 *         description: Invalid PIN or unauthorized
 *       500:
 *         description: Server error
 */
router.post("/withdraw", authenticate, withdraw);

// Transfer || METHOD POST
/**
 * @swagger
 * /api/transactions/transfer:
 *   post:
 *     summary: Transfer money to another user's account
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               toAccount:
 *                 type: string
 *                 description: Recipient's account number
 *               amount:
 *                 type: number
 *                 description: Amount to transfer
 *               pin:
 *                 type: string
 *                 description: User's PIN
 *     responses:
 *       200:
 *         description: Transfer successful
 *       400:
 *         description: Invalid amount, insufficient funds, or other validation error
 *       401:
 *         description: Invalid PIN or unauthorized
 *       404:
 *         description: Recipient account not found
 *       500:
 *         description: Server error
 */
router.post("/transfer", authenticate, transfer);

// Get Transaction History || METHOD GET
/**
 * @swagger
 * /api/transactions/history:
 *   get:
 *     summary: Get the transaction history of the logged-in user
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction history fetched successfully
 *       500:
 *         description: Server error
 */
router.get("/history", authenticate, getTransactions);

export default router;
