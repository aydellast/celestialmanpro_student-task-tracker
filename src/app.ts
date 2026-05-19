import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import focusRoutes from "./routes/focusRoutes";
import collaborationRoutes from "./routes/collaborationRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/focus", focusRoutes);
app.use("/api/collaboration", collaborationRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Student Task Tracker API Running...");
});

export default app;