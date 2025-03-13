import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3333");

const ChatApp = () => {
  const [sceneId, setSceneId] = useState("");
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState("abc-01");
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    if (isJoined) {
      socket.emit("join_channel", { sessionId, username });

      socket.on("receive_message", (data) => {
        setMessages((prev) => [...prev, data]);
      });

      return () => {
        socket.off("receive_message");
      };
    }
  }, [isJoined, sessionId, username]);

  const joinChat = () => {
    if (username.trim()) {
      setIsJoined(true);
    }
  };

  const sendMessage = () => {
    if (sceneId.trim()) {
      socket.emit("send_message", { sessionId, sceneId });
      setSceneId("");
    }
  };

  return (
    <div>
      {!isJoined ? (
        <div>
          <h2>Enter your name</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your name"
          />
          <button onClick={joinChat}>Join Chat</button>
        </div>
      ) : (
        <div>
          <h2>Chat Room: {sessionId}</h2>
          <input
            type="text"
            value={sceneId}
            onChange={(e) => setSceneId(e.target.value)}
            placeholder="Enter Scene ID"
          />
          <button onClick={sendMessage}>Send</button>
          <div>
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.username}:</strong> {msg.sceneId}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
