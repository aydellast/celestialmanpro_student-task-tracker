import { Response } from "express";

import prisma from "../prisma/client";
import { AuthRequest } from "../middlewares/authMiddleware";

// ======================
// START FOCUS SESSION
// ======================
export const startFocusSession = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      duration,
      taskId,
    } = req.body;

    // Validasi
    if (!duration) {
      return res.status(400).json({
        message: "Duration is required",
      });
    }

    const startTime = new Date();

    // Hitung end time otomatis
    const endTime = new Date(
      startTime.getTime() + duration * 60000
    );

    const focusSession =
      await prisma.focusSession.create({
        data: {
          duration,
          startTime,
          endTime,
          userId: req.user!.userId,
          taskId: taskId || null,
        },

        include: {
          task: true,
        },
      });

    res.status(201).json({
      message: "Focus session started",
      focusSession,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ======================
// END FOCUS SESSION
// ======================
export const endFocusSession = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const session =
      await prisma.focusSession.findFirst({
        where: {
          id,
          userId: req.user!.userId,
        },
      });

    if (!session) {
      return res.status(404).json({
        message: "Focus session not found",
      });
    }

    // Update end time ke waktu sekarang
    const updatedSession =
      await prisma.focusSession.update({
        where: {
          id,
        },

        data: {
          endTime: new Date(),
        },
      });

    res.status(200).json({
      message: "Focus session ended",
      focusSession: updatedSession,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ======================
// GET FOCUS HISTORY
// ======================
export const getFocusHistory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const history =
      await prisma.focusSession.findMany({
        where: {
          userId: req.user!.userId,
        },

        include: {
          task: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    res.status(200).json({
      history,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};