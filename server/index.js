require("dotenv").config();
require("./db")();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const router = require("./router");
const io = new Server(server, {
  cors: {
    // origin: ["http://localhost:3000", process.env.CLIENT],
    method: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use("/", router);
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

/********** socket.io ***********/

const FileController = require("./controllers/file");

io.on("connection", (socket) => {
  socket.on("get-file", async (fileData) => {
    const file = await FileController.getFile(fileData);
    const fileId = fileData?.fileId;
    socket.join(fileData?.fileId);
    socket.emit("send-file", file);
    socket.on("send-changes", async ({data,senderId}) => {
      await FileController.update({ fileId, data });
      console.log(data,senderId)
      // io.to(fileId).emit("rec-changes", data);
      socket.broadcast.to(fileId).emit('rec-changes', {data,senderId});
    });
  });
});


/********** socket.io ***********/

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
