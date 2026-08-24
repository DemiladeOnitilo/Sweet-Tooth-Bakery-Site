import { Router } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import https from "https";
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

// POST /api/checkout/initialize
router.post("/initialize", (req, res) => {
  const user = getUser(req);
  if (!user) return res.status(401).json({ error: "Authentication required" });

  const { items, subtotal, delivery_fee, total, delivery_address, phone, notes } = req.body;

  if (!items || !items.length || !delivery_address || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const reference = `ST-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;

  run(
    "INSERT INTO orders (user_id, order_reference, items, subtotal, delivery_fee, total, delivery_address, phone, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [user.id, reference, JSON.stringify(items), subtotal, delivery_fee, total, delivery_address, phone, notes || ""]
  );

  const paystackData = JSON.stringify({
    email: user.email,
    amount: Math.round(total * 100),
    reference,
    callback_url: `${req.protocol}://${req.get("host")}/api/checkout/callback?reference=${reference}`,
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const paystackReq = https.request(options, (paystackRes) => {
    let data = "";
    paystackRes.on("data", (chunk) => (data += chunk));
    paystackRes.on("end", () => {
      try {
        const response = JSON.parse(data);
        if (response.status) {
          res.json({
            reference,
            authorization_url: response.data.authorization_url,
            access_code: response.data.access_code,
          });
        } else {
          run("UPDATE orders SET payment_status = 'failed' WHERE order_reference = ?", [reference]);
          res.status(400).json({ error: "Paystack initialization failed", details: response.message });
        }
      } catch (e) {
        res.status(500).json({ error: "Invalid response from Paystack" });
      }
    });
  });

  paystackReq.on("error", (err) => {
    console.error("Paystack request error:", err);
    run("UPDATE orders SET payment_status = 'failed' WHERE order_reference = ?", [reference]);
    res.status(500).json({ error: "Payment gateway error" });
  });

  paystackReq.write(paystackData);
  paystackReq.end();
});

// GET /api/checkout/verify
router.get("/verify", (req, res) => {
  const { reference } = req.query;
  if (!reference) return res.status(400).json({ error: "Reference is required" });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: `/transaction/verify/${encodeURIComponent(reference)}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
  };

  https.get(options, (paystackRes) => {
    let data = "";
    paystackRes.on("data", (chunk) => (data += chunk));
    paystackRes.on("end", () => {
      try {
        const response = JSON.parse(data);
        if (response.status && response.data.status === "success") {
          run("UPDATE orders SET status = 'paid', payment_status = 'paid' WHERE order_reference = ?", [reference]);
          res.json({ verified: true, data: response.data });
        } else {
          res.json({ verified: false, data: response.data });
        }
      } catch {
        res.status(500).json({ error: "Invalid response from Paystack" });
      }
    });
  }).on("error", (err) => {
    console.error("Paystack verify error:", err);
    res.status(500).json({ error: "Verification failed" });
  });
});

// GET /api/checkout/callback
router.get("/callback", (req, res) => {
  const { reference } = req.query;
  if (!reference) return res.status(400).send("Missing reference");

  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
  res.redirect(`${frontendUrl}/checkout/success?reference=${reference}`);
});

// POST /api/checkout/verify-and-generate-discount
router.post("/verify-and-generate-discount", (req, res) => {
  const user = getUser(req);
  if (!user) return res.status(401).json({ error: "Authentication required" });

  const { reference } = req.body;
  if (!reference) return res.status(400).json({ error: "Reference required" });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: `/transaction/verify/${encodeURIComponent(reference)}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
  };

  https.get(options, (paystackRes) => {
    let data = "";
    paystackRes.on("data", (chunk) => (data += chunk));
    paystackRes.on("end", () => {
      try {
        const response = JSON.parse(data);
        if (response.status && response.data.status === "success") {
          run("UPDATE orders SET status = 'paid', payment_status = 'paid' WHERE order_reference = ?", [reference]);

          const orderCountRow = get(
            "SELECT COUNT(*) as count FROM orders WHERE user_id = ? AND payment_status = 'paid'",
            [user.id]
          );
          const orderCount = orderCountRow ? orderCountRow.count : 0;

          const discountMilestones = [3, 5, 10, 15, 20];
          if (discountMilestones.includes(orderCount)) {
            const code = `SWEET${orderCount}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
            const value = orderCount >= 10 ? 15 : 10;
            run(
              "INSERT INTO discount_codes (user_id, code, type, value, min_spend, expires_at) VALUES (?, ?, 'percentage', ?, 5000, datetime('now', '+30 days'))",
              [user.id, code, value]
            );
            res.json({ verified: true, discount: { code, value }, orderCount });
          } else {
            res.json({ verified: true, discount: null, orderCount });
          }
        } else {
          res.json({ verified: false, error: "Payment not confirmed" });
        }
      } catch {
        res.status(500).json({ error: "Verification failed" });
      }
    });
  }).on("error", (err) => {
    console.error("Verify error:", err);
    res.status(500).json({ error: "Verification failed" });
  });
});

export default router;