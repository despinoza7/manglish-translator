export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo no permitido" });
  }

  try {
    const { text } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Traduce este texto de Manglish a español de forma natural:\n${text}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    let result;

    if (data.candidates && data.candidates.length > 0) {
      result = data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      result = "ERROR GOOGLE: " + JSON.stringify(data.error);
    } else {
      result = "RESPUESTA DESCONOCIDA: " + JSON.stringify(data);
    }

    return res.status(200).json({
      result: result,
    });

  } catch (error) {
    return res.status(500).json({
      result: "Error del servidor",
    });
  }
}