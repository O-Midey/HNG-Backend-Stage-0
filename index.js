import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/me", async (req, res) => {
  try {
    // Fetch random cat fact
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000,
    });
    const catFact = response.data.fact;

    // JSON success response
    const data = {
      status: "success",
      user: {
        email: "talk2adeoluwa2310@gmail.com",
        name: "Omotosho David Adeoluwa",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: catFact,
    };

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);

    // Fallback response if cat fact API fails
    const data = {
      status: "success",
      user: {
        email: "talk2adeoluwa2310@gmail.com",
        name: "Omotosho David Adeoluwa",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: " I couldn’t fetch a cat fact right now 😿",
    };

    return res.status(200).json(data);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
