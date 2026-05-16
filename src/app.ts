import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import focusRoutes from "./routes/focusRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/focus", focusRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Student Task Tracker API Running...");
});

export default app;