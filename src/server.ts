import express from "express";
import { config } from "dotenv";
import { authRouter } from "./routes/auth.routes";

config();

const server = express();

server.use(express.json());

server.use("/auth", authRouter);

server.listen(process.env.PORT, () => {
  console.log("Server Running! http://localhost:8000");
});
