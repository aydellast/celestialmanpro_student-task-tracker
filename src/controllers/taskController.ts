import { Response } from "express";

import prisma from "../prisma/client";
import { AuthRequest } from "../middlewares/authMiddleware";
import { determinePriority } from "../utils/priority";

// ======================
// CREATE TASK
// ======================
export const createTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const {
      title,
      description,
      dueDate,
      customLabel,
      sks,
      difficulty,
    } = req.body;

    // Validasi
    if (
      !title ||
      !dueDate ||
      !sks ||
      !difficulty
    ) {
      return res.status(400).json({
        message:
          "Title, dueDate, sks, and difficulty are required",
      });
    }

    // PRIORITY OTOMATIS
    const priorityId = determinePriority(
      new Date(dueDate),
      Number(sks),
      Number(difficulty)
    );

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        customLabel,

        sks: Number(sks),
        difficulty: Number(difficulty),

        priorityId,

        userId: req.user!.userId,
      },

      include: {
        priority: true,
      },
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ======================
// GET ALL TASKS
// ======================
export const getTasks = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user!.userId,
      },

      include: {
        priority: true,
        collaborators: true,
        focusSessions: true,
      },

      orderBy: [
        {
          priorityId: "asc",
        },
        {
          dueDate: "asc",
        },
      ],
    });

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ======================
// GET TASK DETAIL
// ======================
export const getTaskById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user!.userId,
      },

      include: {
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

    res.status(200).json({
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ======================
// UPDATE TASK
// ======================
export const updateTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const {
      title,
      description,
      status,
      dueDate,
      customLabel,
      sks,
      difficulty,
    } = req.body;

    // Pastikan task milik user
    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user!.userId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // PRIORITY OTOMATIS SAAT UPDATE
    const priorityId = determinePriority(
      new Date(dueDate),
      Number(sks),
      Number(difficulty)
    );

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },

      data: {
        title,
        description,
        status,
        dueDate: dueDate
          ? new Date(dueDate)
          : null,

        customLabel,

        sks: Number(sks),
        difficulty: Number(difficulty),

        priorityId,
      },

      include: {
        priority: true,
      },
    });

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// ======================
// DELETE TASK
// ======================
export const deleteTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    // Pastikan task milik user
    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user!.userId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Hapus collaborator dulu
    await prisma.taskCollaborator.deleteMany({
      where: {
        taskId: id,
      },
    });

    // Hapus focus session dulu
    await prisma.focusSession.deleteMany({
      where: {
        taskId: id,
      },
    });

    // Baru hapus task
    await prisma.task.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};