import { Router } from "express";
import jwt from "jsonwebtoken";
import { run, get, all } from "../database.js";

const router = Router();

const getUser = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  try {
    return jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
  } catch {
    return null;
  }
};

// GET /api/orders
router.get("/", (req, res) => {
  const user = getUser(req);
  if (!user) return res.status(401).json({ error: "Authentication required" });

  const orders = all(
    "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [user.id]
  );

  const parsed = orders.map((o) => ({
    ...o,
    items: JSON.parse(o.items),
  }));

  res.json({ orders: parsed });
});

// GET /api/orders/discounts
router.get("/discounts", (req, res) => {
  const user = getUser(req);
  if (!user) return res.status(401).json({ error: "Authentication required" });

  const discounts = all(
    "SELECT * FROM discount_codes WHERE user_id = ? AND is_used = 0 AND (expires_at IS NULL OR expires_at > datetime('now'))",
    [user.id]
  );

  res.json({ discounts });
});

export default router;