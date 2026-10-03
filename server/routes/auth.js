import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { run, get, all } from "../database.js";

const router = Router();

// Fail loudly at import time if JWT_SECRET is missing, instead of
// silently 500ing on every signup/login attempt.
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set — check your .env file and dotenv.config() setup");
}

const normalizeEmail = (email) => email.trim().toLowerCase();

// POST /api/auth/signup
// POST /api/auth/signup
router.post("/signup", (req, res) => {
  // 1. Add address to the destructured body
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters" });
  }

  const normalizedEmail = normalizeEmail(email);

  try {
    const existing = get("SELECT id FROM users WHERE email = ?", [normalizedEmail]);
    if (existing) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    // 2. Add address to the INSERT statement
    run(
      "INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)",
      [name, normalizedEmail, hashedPassword, phone || "", address || ""]
    );

    const user = get(
      "SELECT id, name, email, phone, address FROM users WHERE email = ?",
      [normalizedEmail]
    );

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address || "",
      },
      token,
    });
  } catch (err) {
    if (err.message && err.message.includes("UNIQUE constraint failed")) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const normalizedEmail = normalizeEmail(email);

  try {
    const user = get("SELECT * FROM users WHERE email = ?", [normalizedEmail]);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address || "",
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// GET /api/auth/me
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    const user = get(
      "SELECT id, name, email, phone, address, created_at FROM users WHERE id = ?",
      [decoded.id]
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    const message = err.name === "TokenExpiredError" ? "Session expired" : "Invalid token";
    res.status(401).json({ error: message });
  }
});

// PUT /api/auth/profile
router.put("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
    const { name, phone, address } = req.body;

    run(
      "UPDATE users SET name = COALESCE(?, name), phone = COALESCE(?, phone), address = COALESCE(?, address) WHERE id = ?",
      [name || null, phone || null, address || null, decoded.id]
    );

    res.json({ message: "Profile updated" });
  } catch (err) {
    const message = err.name === "TokenExpiredError" ? "Session expired" : "Invalid token";
    res.status(401).json({ error: message });
  }
});

export default router;