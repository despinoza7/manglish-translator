import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const traducir = async () => {
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: input,
        mode: "ms-es",
      }),
    });

    const data = await response.json();
    setOutput(data.result);
    
  } catch (error) {
    setOutput("Error de conexión");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Traductor Manglish</h1>

      <textarea
        style={{ width: "100%", height: "100px" }}
        placeholder="Escribe aquí..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={traducir}>
        Traducir
      </button>

      <p>{output}</p>
    </div>
  );
}
