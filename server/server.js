import "dotenv/config";
import express from "express";
import cors from "cors";
import { initDatabase } from "./database.js";
import authRoutes from "./routes/auth.js";
import checkoutRoutes from "./routes/checkout.js";
import orderRoutes from "./routes/orders.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Initialize database then start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Sweet Tooth server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to initialize database:", err);
  process.exit(1);
});