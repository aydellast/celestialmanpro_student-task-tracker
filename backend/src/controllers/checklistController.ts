import { Response } from "express";

import prisma from "../prisma/client";

import { AuthRequest } from "../middlewares/authMiddleware";

const checkTaskAccess = async (
  taskId: string,
  userId: string
) => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },

    include: {
      collaborators: true,
    },
  });

  if (!task) {
    return null;
  }

  const isOwner =
    task.userId === userId;

  const isCollaborator =
    task.collaborators.some(
      (collaborator) =>
        collaborator.userId === userId
    );

  if (!isOwner && !isCollaborator) {
    return null;
  }

  return task;
};

export const getTaskChecklists = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const taskId = String(
      req.params.taskId
    );

    const task =
      await checkTaskAccess(
        taskId,
        req.user!.userId
      );

    if (!task) {
      return res.status(404).json({
        message:
          "Task not found or access denied",
      });
    }

    const checklists =
      await prisma.taskChecklist.findMany({
        where: {
          taskId,
        },

        include: {
          doneBy: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },

        orderBy: {
          createdAt: "asc",
        },
      });

    res.status(200).json({
      checklists,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createTaskChecklist = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const taskId = String(
      req.params.taskId
    );

    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message:
          "Checklist title is required",
      });
    }

    const task =
      await checkTaskAccess(
        taskId,
        req.user!.userId
      );

    if (!task) {
      return res.status(404).json({
        message:
          "Task not found or access denied",
      });
    }

    const checklist =
      await prisma.taskChecklist.create({
        data: {
          title,
          taskId,
        },

        include: {
          doneBy: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      });

    res.status(201).json({
      message:
        "Checklist created successfully",
      checklist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const toggleTaskChecklist = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const checklistId = String(
      req.params.checklistId
    );

    const checklist =
      await prisma.taskChecklist.findUnique({
        where: {
          id: checklistId,
        },

        include: {
          task: {
            include: {
              collaborators: true,
            },
          },

          doneBy: true,
        },
      });

    if (!checklist) {
      return res.status(404).json({
        message:
          "Checklist not found",
      });
    }

    const isOwner =
      checklist.task.userId ===
      req.user!.userId;

    const isCollaborator =
      checklist.task.collaborators.some(
        (collaborator: any) =>
          collaborator.userId ===
          req.user!.userId
      );

    if (!isOwner && !isCollaborator) {
      return res.status(403).json({
        message:
          "Access denied",
      });
    }

    const updatedChecklist =
      await prisma.taskChecklist.update({
        where: {
          id: checklistId,
        },

        data: {
          isDone:
            !checklist.isDone,

          doneById:
            checklist.isDone
              ? null
              : req.user!.userId,
        },

        include: {
          doneBy: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      });

    res.status(200).json({
      message:
        "Checklist updated successfully",
      checklist:
        updatedChecklist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteTaskChecklist = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const checklistId = String(
      req.params.checklistId
    );

    const checklist =
      await prisma.taskChecklist.findUnique({
        where: {
          id: checklistId,
        },

        include: {
          task: true,
        },
      });

    if (!checklist) {
      return res.status(404).json({
        message:
          "Checklist not found",
      });
    }

    if (
      checklist.task.userId !==
      req.user!.userId
    ) {
      return res.status(403).json({
        message:
          "Only task owner can delete checklist",
      });
    }

    await prisma.taskChecklist.delete({
      where: {
        id: checklistId,
      },
    });

    res.status(200).json({
      message:
        "Checklist deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};