import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import controllers from "./controller/routing/controllers";
import { ENVIRONMENT, FRONTEND_URL, PORT } from "./config/config";

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
    origin: ENVIRONMENT === "DEV" ? FRONTEND_URL : "https://*.ayush.com", // Adjust for production
    methods: ["GET", "POST"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount all routes (including "/") under "/api"
// app.use("/", authRoutes);

// Use the auth routes
app.use("/api", ...controllers);

// Global error-handling middleware with proper types
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Global Error Handler:", err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Something went wrong",
  });
});

// Start the server
// const PORT = 5000;
// const PORT = 5173;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
