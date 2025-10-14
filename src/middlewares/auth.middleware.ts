import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token must be provided" });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token must be provided" });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    console.error("Authenticate Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
