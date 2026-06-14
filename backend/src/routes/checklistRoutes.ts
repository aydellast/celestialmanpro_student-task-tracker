import express from "express";

import {
  getTaskChecklists,
  createTaskChecklist,
  toggleTaskChecklist,
  deleteTaskChecklist,
} from "../controllers/checklistController";

import {
  authMiddleware,
} from "../middlewares/authMiddleware";

const router =
  express.Router();

router.get(
  "/task/:taskId",
  authMiddleware,
  getTaskChecklists
);

router.post(
  "/task/:taskId",
  authMiddleware,
  createTaskChecklist
);

router.patch(
  "/:checklistId/toggle",
  authMiddleware,
  toggleTaskChecklist
);

router.delete(
  "/:checklistId",
  authMiddleware,
  deleteTaskChecklist
);

export default router;