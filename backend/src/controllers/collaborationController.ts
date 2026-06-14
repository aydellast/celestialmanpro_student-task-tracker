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

    if (task.userId === req.user!.userId) {
      return res.status(400).json({
        message: "You are the owner of this task",
      });
    }

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

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },

      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },

        priority: true,

        collaborators: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
          },
        },

        focusSessions: true,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const isOwner =
      task.userId === req.user!.userId;

    const isCollaborator =
      task.collaborators.some(
        (collaborator) =>
          collaborator.userId ===
          req.user!.userId
      );

    if (!isOwner && !isCollaborator) {
      return res.status(403).json({
        message: "You do not have access to this task",
      });
    }

    res.status(200).json({
      task: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        taskCode: task.taskCode,
        sks: task.sks,
        difficulty: task.difficulty,
        priority: task.priority,
        owner: task.user,
      },

      collaborators: task.collaborators,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};