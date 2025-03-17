import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://socket-io.vizion.space/");

const Viewer = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (sessionId) {
      socket.emit("joinRoom", sessionId);
    }

    socket.on("receiveChangeSceneCmd", (sceneId) => {
      console.log("🚀 ~ socket.on ~ message:", sceneId);

      setMessages((prev) => [...prev, sceneId]);
    });

    return () => {
      socket.off("receiveChangeSceneCmd");
    };
  }, [sessionId]);

  return (
    <div>
      <h2>Viewer</h2>
      <p>Session: {sessionId}</p>
      <h3>Messages:</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Viewer;
