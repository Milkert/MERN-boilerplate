import React, { useState } from "react";

function App() {
  const [apiMessage, setApiMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/test");
      const data: { message: string } = await res.json();
      setApiMessage(data.message);
    } catch (error) {
      setApiMessage("Error connecting to backend");
      console.error("API Error:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <h1>MERN Boilerplate</h1>
      <button onClick={testConnection} disabled={loading}>
        {loading ? "Testing.." : "Test Backend Connection"}
      </button>
      {apiMessage && <p>Backend says: {apiMessage}</p>}
    </>
  );
}

export default App;
