import express from "express";

import {
  register,
  login,
  getCurrentUser,
} from "../controllers/authController";

import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected Route
router.get("/me", authMiddleware, getCurrentUser);

export default router;