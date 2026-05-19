import express from "express";

import {
  joinTaskByCode,
  getTaskCollaborators,
} from "../controllers/collaborationController";

import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Join task by code
router.post(
  "/join",
  authMiddleware,
  joinTaskByCode
);

// Get collaborators
router.get(
  "/task/:taskId",
  authMiddleware,
  getTaskCollaborators
);

export default router;