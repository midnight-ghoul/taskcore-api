import express from "express";
import { config } from "dotenv";
import { authRouter } from "./routes/auth.routes";
import { taskRouter } from "./routes/task.routes";
import { authenticate } from "./middlewares/auth.middleware";

config();

const server = express();

server.use(express.json());

server.use("/auth", authRouter);
server.use("/tasks", authenticate, taskRouter);

server.listen(process.env.PORT, () => {
  console.log("Server Running! http://localhost:8000");
});
