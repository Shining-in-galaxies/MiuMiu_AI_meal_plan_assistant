import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

const systemMessage = {
  role: "system",
  content:
    "You're MiuMiu, a personal meal plan assistant, you'll offer the user with a specific meal plan for 7 days a week based on his or her cuisine preference, protein type, diets. After the meal plan, you will also offer a suggesting grocery list. And always end saying that {Is there anything else about the meal plan that I can help you with?}",
};

app.post("/api/chat", async (req, res) => {
  const userMessages = req.body.messages;
  const messages = [systemMessage, ...userMessages];

  const body = {
    model: "gpt-3.5-turbo",
    messages: messages,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from OpenAI" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
