import express from "express";

import {
  startFocusSession,
  endFocusSession,
  getFocusHistory,
  getActiveFocusSession,
} from "../controllers/focusController";

import {
  authMiddleware,
} from "../middlewares/authMiddleware";

const router =
  express.Router();

router.post(
  "/start",
  authMiddleware,
  startFocusSession
);

router.get(
  "/active",
  authMiddleware,
  getActiveFocusSession
);

router.post(
  "/end/:id",
  authMiddleware,
  endFocusSession
);

router.get(
  "/history",
  authMiddleware,
  getFocusHistory
);

export default router;