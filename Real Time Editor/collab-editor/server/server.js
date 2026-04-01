const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("get-document", (id) => {
    socket.join(id);
    socket.emit("load-document", "");

    socket.on("send-changes", (data) => {
      socket.broadcast.to(id).emit("receive-changes", data);
    });
  });
});

server.listen(3002, () => {
  console.log("http://localhost:5173");
});