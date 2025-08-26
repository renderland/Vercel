import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config(); // local test için, Vercel’de otomatik okunur

const app = express();
app.use(express.json());

const OPENROUTER_KEY = process.env.OPENROUTER_KEY;
console.log("OPENROUTER_KEY set mi?", !!OPENROUTER_KEY); // deploy loglarında true görmelisin

app.post("/npc", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_KEY}` // boşluk önemli
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy çalışıyor: http://localhost:${PORT}`));
