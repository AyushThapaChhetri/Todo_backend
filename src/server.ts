import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import controllers from "./controller/routing/controllers";
import { ENVIRONMENT, FRONTEND_URL, PORT } from "./config/config";

// Node.js comes with a built-in module called http, but it requires a lot of code to create a server.
// Express simplifies this process by providing an easier way to handle requests, routes, and middleware.
const app = express();

// const cors = require("cors");
// enabling CORS for any unknown origin(https://xyz.example.com)
// app.use(
//   cors(
//     environment == "DEV" ? "http://192.168.1.89:5173" : "https://*.ayush.com"
//   )
// );

// Configure CORS
// It allows your frontend (React, Vue, etc.) to communicate with your backend (Express API) even if they are running on different domains.
app.use(
  cors({
    origin: ENVIRONMENT === "DEV" ? FRONTEND_URL : "https://*.ayush.com", // Adjust for production
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);
// Middleware to parse JSON bodies
app.use(express.json());

// It allows Express to understand application/x-www-form-urlencoded data.
// extended: false?
// false → Can only handle simple objects (key-value pairs).
// true → Can handle nested objects
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
