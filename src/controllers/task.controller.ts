import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "UserId must be provided" });
    }

    const tasks = await prisma.task.findMany({
      where: { userId },
    });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { userId, label } = req.body;

    if (!userId || !label) {
      return res
        .status(400)
        .json({ message: "UserId and label must be provided" });
    }

    const task = await prisma.task.create({
      data: { userId, label },
    });

    return res.status(201).json(task);
  } catch (error) {
    console.error("Create Task Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
