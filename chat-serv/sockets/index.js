import http from "http";
import express from "express";
import { Server } from "socket.io";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const app = express(); //for handling http request / response
const server = http.createServer(app); //creating server
const io = new Server(server, {
  cors: {
    origin: [CLIENT_URL],
  },
}); //creating socket server on top of http server. so now we have two functionalities, http and socket(realtime comm.)

export { app, server, io };
