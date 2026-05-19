import { Response } from "express";

import prisma from "../prisma/client";
import { AuthRequest } from "../middlewares/authMiddleware";

// ======================
// JOIN TASK BY CODE
// ======================
export const joinTaskByCode = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { taskCode } = req.body;

    if (!taskCode) {
      return res.status(400).json({
        message: "Task code is required",
      });
    }

    // Cari task berdasarkan kode
    const task = await prisma.task.findUnique({
      where: {
        taskCode,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Cek apakah user sudah join
    const existingCollaborator =
      await prisma.taskCollaborator.findFirst({
        where: {
          taskId: task.id,
          userId: req.user!.userId,
        },
      });

    if (existingCollaborator) {
      return res.status(400).json({
        message: "You already joined this task",
      });
    }

    // Tambahkan collaborator
    const collaborator =
      await prisma.taskCollaborator.create({
        data: {
          taskId: task.id,
          userId: req.user!.userId,
        },

        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },

          task: true,
        },
      });

    res.status(201).json({
      message: "Joined task successfully",
      collaborator,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ======================
// GET TASK COLLABORATORS
// ======================
export const getTaskCollaborators = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const taskId = req.params.taskId as string;

    // Pastikan task ada
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Ambil collaborator
    const collaborators =
      await prisma.taskCollaborator.findMany({
        where: {
          taskId,
        },

        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      });

    res.status(200).json({
      task: {
        id: task.id,
        title: task.title,
        taskCode: task.taskCode,
      },

      collaborators,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};