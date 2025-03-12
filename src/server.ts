import express from "express";
import authRoutes from "./controller/routing/auth.routes";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const environment = process.env.NODE_ENV || "DEV";
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const app = express();

// const cors = require("cors");
// enabling CORS for any unknown origin(https://xyz.example.com)
// app.use(
//   cors(
//     environment == "DEV" ? "http://192.168.1.89:5173" : "https://*.ayush.com"
//   )
// );

// Configure CORS
app.use(
  cors({
    origin: environment === "DEV" ? FRONTEND_URL : "https://*.ayush.com", // Adjust for production
    methods: ["GET", "POST"], // Allowed methods
    allowedHeaders: ["Content-Type"], // Allowed headers
  })
);
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount all routes (including "/") under "/api"
// app.use("/", authRoutes);

// Use the auth routes
app.use("/api", authRoutes);

// Start the server
// const PORT = 5000;
// const PORT = 5173;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
