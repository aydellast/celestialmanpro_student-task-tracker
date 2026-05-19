import express from "express";

import {
  startFocusSession,
  endFocusSession,
  getFocusHistory,
} from "../controllers/focusController";

import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Start Focus
router.post(
  "/start",
  authMiddleware,
  startFocusSession
);

// End Focus
router.post(
  "/end/:id",
  authMiddleware,
  endFocusSession
);

// Get History
router.get(
  "/history",
  authMiddleware,
  getFocusHistory
);

export default router;