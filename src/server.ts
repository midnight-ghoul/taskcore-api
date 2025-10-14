import express from "express";
import { config } from "dotenv";

config();

const server = express();

server.use(express.json());

server.listen(process.env.PORT, () => {
  console.log("Server Running! http://localhost:8000");
});
