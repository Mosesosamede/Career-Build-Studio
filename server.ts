import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Flutterwave Payment Verification
  app.post("/api/payment/verify", async (req, res) => {
    const { transactionId, expectedAmount, expectedCurrency } = req.body;

    try {
      const response = await fetch(
        `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
        {
          headers: {
            Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          },
        }
      );

      const data = await response.json();

      const verified =
        data.data?.status === 'successful' &&
        data.data?.amount >= (expectedAmount || 0) &&
        data.data?.currency === (expectedCurrency || 'NGN');

      res.json({ verified, data: data.data });
    } catch (error) {
      console.error("Verification error:", error);
      res.status(500).json({ error: "Failed to verify payment" });
    }
  });

  // Contact Form Submission Proxy
  app.post("/api/contact", async (req, res) => {
    const apiUrl = process.env.VITE_CONTACT_API_URL;
    
    if (!apiUrl) {
      console.error("VITE_CONTACT_API_URL is not set");
      return res.status(500).json({ error: "API configuration missing" });
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
        redirect: "follow", // Ensure we follow redirects for Google Apps Script
      });

      // Google Apps Script returns a redirect or a simple JSON
      // If it's a redirect, fetch handles it automatically.
      // We just need to know if it was sent successfully.
      res.json({ success: true });
    } catch (error) {
      console.error("Contact submission error:", error);
      res.status(500).json({ error: "Failed to submit form" });
    }
  });

  // Visibility Form Submission Proxy
  app.post("/api/visibility", async (req, res) => {
    const apiUrl = process.env.VISIBILITY_API_URL;
    
    if (!apiUrl) {
      console.error("VISIBILITY_API_URL is not set");
      return res.status(500).json({ error: "API configuration missing" });
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
        redirect: "follow",
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Visibility submission error:", error);
      res.status(500).json({ error: "Failed to submit form" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
