export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo no permitido" });
  }

  try {
    // Recibir texto del frontend
    const { text } = req.body;

    // Llamada a Google AI (Gemini)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`,
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
                  text: `Traduce este texto de Manglish a español de forma natural:\n${text}`
                }
              ]
            }
          ]
        }),
      }
    );

    // Convertir respuesta
    const data = await response.json();

    // Extraer resultado
    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "Error";

    // Enviar respuesta
    return res.status(200).json({
      result: result
    });

  } catch (error) {
    return res.status(500).json({
      result: "Error del servidor"
    });
  }
}