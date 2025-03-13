const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }, // Cho phép tất cả client kết nối
});

app.use(cors());

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Khi client gửi sessionId, thêm nó vào room
  socket.on("joinRoom", (sessionId) => {
    socket.join(sessionId);
    console.log(`Client ${socket.id} joined room: ${sessionId}`);
  });

  // Nhận tin nhắn từ chatbot và gửi đến tất cả client trong room
  socket.on("ChangeScene", ({ sessionId, sceneId }) => {
    console.log(`Message from ${socket.id} to room ${sessionId}: ${sceneId}`);
    io.to(sessionId).emit("receiveChangeSceneCmd", sceneId);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(3333, () => {
  console.log("Server is running on port 3333");
});
