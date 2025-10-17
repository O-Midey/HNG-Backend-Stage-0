import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/me", async (req, res, next) => {
  try {
    // Fetch a random cat fact
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000,
    });
    const catFact = response.data.fact;

    // Respond with user info and cat fact
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({
      status: "success",
      user: {
        email: "talk2adeoluwa2310@gmail.com",
        name: "Omotosho David Adeoluwa",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: catFact,
    });
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);

    // Fallback response if cat fact fetch fails
    return res.status(200).json({
      status: "success",
      user: {
        email: "talk2adeoluwa2310@gmail.com",
        name: "Omotosho David Adeoluwa",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: "I couldn’t fetch a cat fact right now 😿",
    });
  }
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
