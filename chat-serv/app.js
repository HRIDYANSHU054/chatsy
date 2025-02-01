import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

import { app, server } from "./sockets/index.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.route.js";
import { connectDb } from "./db/connectDb.js";
import globalErrorHandler from "./errors/globalErrorHandler.js";

const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors({ origin: CLIENT_URL, credentials: true })); //cred: true -> to allow receiving cookies
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../chat-cl/dist")));

  app.get("*", (req, resp) => {
    resp.sendFile(path.resolve(__dirname, "../chat-cl", "dist", "index.html"));
  });
}

server.listen(PORT, async () => {
  console.log("Server listening at", PORT);
  await connectDb();
});
