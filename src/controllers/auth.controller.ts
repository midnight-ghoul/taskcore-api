import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return res.status(201).json({
      message: "User successfully created",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Wrong email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY as string, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ message: "User successfully authenticated", token: token });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
