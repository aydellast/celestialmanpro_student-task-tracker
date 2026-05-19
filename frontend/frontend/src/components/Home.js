import { useState } from "react";
import "./Home.css";

function Home() {
  const [showModal, setShowModal] = useState(false);

  const [tasks, setTasks] = useState([
    {
      title: "Pemrograman Web",
      desc: "Pengerjaan database",
      date: "Senin, 30 Maret 2026, 11:00 PM",
      priority: "HIGH PRIORITY",
    },
    {
      title: "UI/UX",
      desc: "Pengerjaan prototype",
      date: "Senin, 02 April 2026, 11:00 PM",
      priority: "HIGH PRIORITY",
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    desc: "",
    date: "",
    priority: false,
  });

  const addTask = () => {
    if (!newTask.title) return;

    setTasks([
      ...tasks,
      {
        title: newTask.title,
        desc: newTask.desc,
        date: newTask.date,
        priority: newTask.priority
          ? "HIGH PRIORITY"
          : "OPTIONAL",
      },
    ]);

    setNewTask({
      title: "",
      desc: "",
      date: "",
      priority: false,
    });

    setShowModal(false);
  };

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className="home-container">

      {/* HEADER */}
      <div className="top-section">

        <div className="header">

          <div className="profile-section">
            <img
              src="https://i.pravatar.cc/100"
              alt=""
              className="profile-img"
            />

            <h5>Halo! Ahmad Khairy</h5>
          </div>

          <div className="notif">
            💬
            <span className="notif-dot"></span>
          </div>

        </div>

      </div>

      {/* CALENDAR */}
      <div className="calendar-wrapper">

        <div className="calendar-title">
          <h2>Maret 2026</h2>
        </div>

        <div className="calendar-grid">

          {days.map((day) => (
            <div className="calendar-day" key={day}>
              {day}
            </div>
          ))}

          {[...Array(35)].map((_, i) => (
            <div
              key={i}
              className={`calendar-date ${
                i === 23 ? "active-date" : ""
              }`}
            >
              {i + 1 <= 31 ? i + 1 : i - 30}
            </div>
          ))}

        </div>

      </div>

      {/* FILTER BUTTON */}
      <div className="filter-buttons">
        <button>Semua</button>
        <button>Selesai</button>
      </div>

      {/* TASK */}
      <div className="task-container">

        {tasks.map((task, index) => (
          <div className="task-card" key={index}>

            <div className="priority-text">
              {task.priority} ⭐
            </div>

            <div className="task-main">

              <input type="checkbox" />

              <div>
                <h4>{task.title}</h4>
                <p>{task.desc}</p>
              </div>

            </div>

            <div className="task-date">
              📅 {task.date}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;