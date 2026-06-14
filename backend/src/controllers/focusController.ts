import { Response } from "express";

import prisma from "../prisma/client";
import { AuthRequest } from "../middlewares/authMiddleware";

export const startFocusSession = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      duration,
      taskId,
    } = req.body;

    if (!duration) {
      return res.status(400).json({
        message: "Duration is required",
      });
    }

    const activeSession =
      await prisma.focusSession.findFirst({
        where: {
          userId: req.user!.userId,
          endTime: {
            gt: new Date(),
          },
        },

        include: {
          task: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    if (activeSession) {
      return res.status(200).json({
        message:
          "Active focus session already exists",
        focusSession:
          activeSession,
      });
    }

    const startTime =
      new Date();

    const endTime =
      new Date(
        startTime.getTime() +
          Number(duration) * 60000
      );

    const focusSession =
      await prisma.focusSession.create({
        data: {
          duration: Number(duration),
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

export const getActiveFocusSession = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const activeSession =
      await prisma.focusSession.findFirst({
        where: {
          userId: req.user!.userId,
          endTime: {
            gt: new Date(),
          },
        },

        include: {
          task: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    res.status(200).json({
      focusSession:
        activeSession || null,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const endFocusSession = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id =
      String(req.params.id);

    const session =
      await prisma.focusSession.findFirst({
        where: {
          id,
          userId: req.user!.userId,
        },
      });

    if (!session) {
      return res.status(404).json({
        message:
          "Focus session not found",
      });
    }

    const updatedSession =
      await prisma.focusSession.update({
        where: {
          id,
        },

        data: {
          endTime:
            new Date(),
        },

        include: {
          task: true,
        },
      });

    res.status(200).json({
      message:
        "Focus session ended",
      focusSession:
        updatedSession,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

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