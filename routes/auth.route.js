import express from "express";
import {
  login,
  register,
  logout,
  userProfile,
} from "../controllers/authController.js";
import { authenticate } from "./../middlewares/authMiddleware.js";

const router = express.Router();

//routing
//Register || METHOD POST
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               pin:
 *                 type:String
 *               initial:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post("/register", register);

//Login || METHOD POST
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               pin:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid username or password
 */
router.post("/login", login);

//Logout || METHOD POST
/**
 * @swagger
 * /api/user/logout:
 *   post:
 *     summary: Logout a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/logout", logout);

//Profile || METHOD GET
/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get the profile of the logged-in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", authenticate, userProfile);

export default router;
