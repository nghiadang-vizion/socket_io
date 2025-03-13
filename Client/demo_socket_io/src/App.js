import { useEffect, useState } from "react";
import "./App.css";
import Chatbot from "./Chatbot";
import Viewer from "./Viewer";

function App() {
  const [sessionId, setSessionId] = useState("session-123");

  console.log(window.location.pathname);

  useEffect(() => {
    setSessionId(window.location.pathname.split("/")[1]);
  }, []);

  return (
    <div>
      <h1>AI Chatbot & 360 Viewer</h1>
      <Chatbot sessionId={sessionId} />
      <Viewer sessionId={sessionId} />
    </div>
  );
}

export default App;
