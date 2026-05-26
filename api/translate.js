export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { text, mode } = req.body;

    const systemPrompt = "Eres un traductor experto en Manglish a español.";

    const userPrompt =
      mode === "ms-es"
        ? `Traduce Manglish a español:\n${text}`
        : `Traduce español a Manglish:\n${text}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    const data = await response.json();

    res.status(200).json({
      result: data.choices?.[0]?.message?.content || "Error",
    });

  } catch (error) {
    res.status(500).json({ result: "Error del servidor" });
  }
}