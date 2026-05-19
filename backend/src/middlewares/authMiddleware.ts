import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ambil token dari header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // Format: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // Simpan user ke request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};