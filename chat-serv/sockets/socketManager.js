import { io } from "./index.js";

//used to store online users
const onlineUsers = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => onlineUsers[receiverId];

io.on("connection", (socket) => {
  //this socket is basically the new user which has connected
  console.log("New user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) onlineUsers[userId] = socket.id;

  //io.emit is used to send event to all the connected clients
  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);

    if (userId) delete onlineUsers[userId];

    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});
