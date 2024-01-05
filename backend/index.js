import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./db/db.js";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import cookieParser from 'cookie-parser'

dotenv.config();

const app = express();
const httpServer = createServer(app);
app.use(cookieParser());
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your React app's URL
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());

app.use(express.json());

// MongoDB connection
connectDB();

 //routes
app.use("/api/user",userRouter);

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Socket.io setup
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle chat messages
  socket.on("chatMessage", (data) => {
  	console.log("Received message from client:", data);
    io.emit("chatMessage", data); // Broadcast the message to all connected clients
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(PORT, () => console.log("Server is running on port:", PORT));
