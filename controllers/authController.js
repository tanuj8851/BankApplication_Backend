import bcrypt from "bcryptjs";
import { User } from "../models/User.model.js";
import {
  createToken,
  generateAccountNumber,
  sendTokenInCookie,
} from "./../utils/accountUtils.js";

export const register = async (req, res) => {
  const { username, pin, initialDeposit = 0 } = req.body;
  // Validate that the PIN is a 4-digit number
  if (!/^\d{4}$/.test(pin)) {
    return res.status(400).json({ message: "PIN must be a 4-digit number" });
  }

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the PIN
    const hashedPin = await bcrypt.hash(pin, 10);

    // Generate a unique account number
    const accountNumber = generateAccountNumber();

    // Create the user
    const newUser = new User({
      username,
      pin: hashedPin,
      accountNumber,
      balance: initialDeposit,
      transactions: [],
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      accountNumber: newUser.accountNumber,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { username, pin } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if account is locked
    if (user.isLocked && user.lockUntil > new Date()) {
      const timeRemaining = Math.ceil(
        (user.lockUntil - new Date()) / (1000 * 60 * 60) // in hours
      );
      return res.status(403).json({
        message: `Account is locked. Try again in ${timeRemaining} hours.`,
      });
    }

    // Verify the PIN
    const isMatch = await bcrypt.compare(pin, user.pin);
    if (!isMatch) {
      user.failedAttempts += 1;

      let attemptLeft = 3 - user.failedAttempts;
      if (user.failedAttempts >= 3) {
        user.isLocked = true;
        user.lockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      }
      await user.save();
      return res.status(401).json({ message: "Invalid PIN", attemptLeft });
    }

    user.failedAttempts = 0;
    await user.save();

    // Create JWT and set cookie
    const token = createToken(user);
    sendTokenInCookie(res, token);

    res.json({ token, user }).status(200);
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.tokenVersion += 1;
    await user.save();

    // Clear the cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging out", error: error.message });
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    console.log("COntroller");

    res.status(200).send({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error userProfile ", error: error.message });
  }
};
