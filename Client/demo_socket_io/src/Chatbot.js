import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://socket-io.vizion.space/");

const Chatbot = ({ sessionId }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (sessionId) {
      socket.emit("joinRoom", sessionId);
    }
  }, [sessionId]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("ChangeScene", { sessionId, sceneId: message });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <p>Session: {sessionId}</p>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
