import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerDocs from "./config/swagger.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

// Security middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.Frontend_URl, // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

//Routes
app.use("/api/user", authRoutes);
app.use("/api/transactions", transactionRoutes);

//api documentations
swaggerDocs(app);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send(`<h1>Banking Application Backend</h1>`);
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
