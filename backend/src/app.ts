import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import focusRoutes from "./routes/focusRoutes";
import collaborationRoutes from "./routes/collaborationRoutes";
import checklistRoutes from "./routes/checklistRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/focus", focusRoutes);
app.use("/api/collaboration", collaborationRoutes);
app.use("/api/checklists", checklistRoutes);

app.get("/", (req, res) => {
  res.send("Student Task Tracker API Running...");
});

export default app;