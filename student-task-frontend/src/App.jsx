import { useEffect, useState } from "react";
import axios from "axios";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "./services/taskService";

function App() {
  // =========================
  // AUTH
  // =========================
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // =========================
  // TASK
  // =========================
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // =========================
  // FETCH TASK
  // =========================
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      alert("Register berhasil");
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert("Register gagal");
    }
  };

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login berhasil");

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Login gagal");
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    localStorage.removeItem("token");

    alert("Logout berhasil");

    setTasks([]);
  };

  // =========================
  // CREATE TASK
  // =========================
  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/tasks",
        {
          title,
          dueDate: "2026-12-31",
          sks: 3,
          difficulty: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task berhasil ditambahkan");

      setTitle("");

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Gagal tambah task");
    }
  };

 // =========================
  // UPDATE TASK
  // =========================
  const handleUpdateTask = async (id) => {
    const judulBaru = prompt("Masukkan judul task yang baru:");
    if (!judulBaru) return;

    try {
      await updateTask(id, {
        title: judulBaru,
        dueDate: "2026-12-31",
        sks: 3,
        difficulty: 2
      });

      alert("Task berhasil diperbarui!");
      fetchTasks(); 
    } catch (error) {
      console.log(error);
      alert("Gagal memperbarui task.");
    }
  }; // <--- Batas akhir fungsi update

  // =========================
  // DELETE TASK (PASTE DI SINI)
  // =========================
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      alert("Task berhasil dihapus");
      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus task");
    }
  };

  // =========================
  // LOGIKA WARNA PRIORITY OTOMATIS
  // =========================
  const getPriorityColor = (priorityName) => {
    if (!priorityName) return "black";
    
    switch (priorityName.toLowerCase()) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "black";
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Task Tracker</h1>

      <hr />

      <h2>Register & Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={handleRegister}>
        Register
      </button>

      <button
        onClick={handleLogin}
        style={{ marginLeft: "10px" }}
      >
        Login
      </button>

      <button
        onClick={handleLogout}
        style={{ marginLeft: "10px" }}
      >
        Logout
      </button>

      <hr />

      <h2>Tambah Task</h2>

      <input
        type="text"
        placeholder="Masukkan task"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <button
        onClick={handleCreateTask}
        style={{ marginLeft: "10px" }}
      >
        Tambah Task
      </button>

      <hr />

      <h2>Task List</h2>

      {tasks.length === 0 ? (
        <p>Belum ada task</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>{task.title}</h3>

            {/* Penerapan warna priority otomatis */}
            <p>
              Priority:{" "}
              <span
                style={{
                  color: getPriorityColor(task.priority?.name),
                  fontWeight: "bold",
                }}
              >
                {task.priority?.name || "None"}
              </span>
            </p>

            <p>
              Deadline:{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
            
            <button onClick={() => handleDeleteTask(task.id)}>
              Delete
            </button>

            <button
              onClick={() => handleUpdateTask(task.id)}
              style={{ marginLeft: "10px" }}
            >
              Update
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;