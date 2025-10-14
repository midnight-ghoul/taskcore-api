import { Router } from "express";
import { createTask, getTasks } from "../controllers/task.controller";

const router = Router();

router.get("/:userId", getTasks);
router.post("/", createTask);

export const taskRouter = router;
