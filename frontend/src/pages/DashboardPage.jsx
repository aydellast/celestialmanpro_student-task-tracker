// ========================================
// FILE: src/pages/DashboardPage.jsx
// ========================================

import {
  useEffect,
  useState,
} from "react";

import Navbar from "../components/Navbar";

import TaskCard from "../components/TaskCard";

import {
  getTasks,
  deleteTask,
} from "../services/taskService";

function DashboardPage() {
  const [tasks, setTasks] =
    useState([]);

  const fetchTasks =
    async () => {
      try {
        const response =
          await getTasks();

        setTasks(response.tasks);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete =
    async (id) => {
      try {
        await deleteTask(id);

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h1>Dashboard</h1>

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={
              handleDelete
            }
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;