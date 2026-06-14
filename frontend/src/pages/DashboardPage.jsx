import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  BsPerson,
  BsPeople,
  BsCheckCircle,
  BsClipboardData,
  BsArrowRightCircle,
  BsClock,
} from "react-icons/bs";

import MainLayout from "../components/layout/MainLayout";
import MiniCalendar from "../components/MiniCalendar";
import TaskModal from "../components/TaskModal";

import {
  getTasks,
} from "../services/taskService";

import {
  getTaskChecklists,
} from "../services/checklistService";

import "../styles/dashboard.css";

function DashboardPage() {
  const navigate =
    useNavigate();

  const username =
    localStorage.getItem("username") ||
    "Student";

  const [tasks, setTasks] =
    useState([]);

  const [isModalOpen,
    setIsModalOpen] =
    useState(false);

  const [selectedDate,
    setSelectedDate] =
    useState("");

  const [activeChecklists,
    setActiveChecklists] =
    useState([]);

  const fetchTasks =
    async () => {
      try {
        const response =
          await getTasks();

        setTasks(response.tasks || []);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchTasks();
  }, []);

  const personalTasks =
    tasks.filter((task) =>
      !task.collaborators ||
      task.collaborators.length === 0
    );

  const teamTasks =
    tasks.filter((task) =>
      task.collaborators &&
      task.collaborators.length > 0
    );

  const completedTasks =
    tasks.filter((task) =>
      task.status === "Done"
    );

  const activeWorkspace =
    teamTasks.find((task) =>
      task.status !== "Done"
    );

  useEffect(() => {
    const fetchChecklist =
      async () => {
        if (!activeWorkspace) {
          setActiveChecklists([]);
          return;
        }

        try {
          const response =
            await getTaskChecklists(
              activeWorkspace.id
            );

          setActiveChecklists(
            response.checklists || []
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchChecklist();
  }, [activeWorkspace?.id]);

  const getDaysLeft =
    (dueDate) => {
      if (!dueDate) {
        return null;
      }

      const today =
        new Date();

      const deadline =
        new Date(dueDate);

      return Math.ceil(
        (
          deadline.getTime() -
          today.getTime()
        ) /
        (1000 * 60 * 60 * 24)
      );
    };

  const getRiskLevel =
    (task) => {
      if (!task) {
        return null;
      }

      if (task.status === "Done") {
        return {
          label: "Low Risk",
          className: "risk-low",
        };
      }

      const daysLeft =
        getDaysLeft(task.dueDate);

      if (daysLeft === null) {
        return {
          label: "Low Risk",
          className: "risk-low",
        };
      }

      if (daysLeft <= 3) {
        return {
          label: "High Risk",
          className: "risk-high",
        };
      }

      if (daysLeft <= 7) {
        return {
          label: "Medium Risk",
          className: "risk-medium",
        };
      }

      return {
        label: "Low Risk",
        className: "risk-low",
      };
    };

  const getDeadlineText =
    (task) => {
      const daysLeft =
        getDaysLeft(task.dueDate);

      if (daysLeft === null) {
        return "No deadline";
      }

      if (daysLeft < 0) {
        return `Terlambat ${Math.abs(daysLeft)} hari`;
      }

      if (daysLeft === 0) {
        return "Deadline hari ini";
      }

      if (daysLeft === 1) {
        return "Besok";
      }

      return `${daysLeft} hari lagi`;
    };

  const activeRisk =
    getRiskLevel(activeWorkspace);

  const completedChecklist =
    activeChecklists.filter(
      (item) => item.isDone
    ).length;

  const totalChecklist =
    activeChecklists.length;

  const checklistProgress =
    totalChecklist === 0
      ? 0
      : Math.round(
          (completedChecklist /
            totalChecklist) *
            100
        );

  const upcomingTasks =
    [...tasks]
      .filter((task) => task.dueDate)
      .sort(
        (a, b) =>
          new Date(a.dueDate) -
          new Date(b.dueDate)
      )
      .slice(0, 4);

  const recentTasks =
    [...tasks]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
      .slice(0, 4);

  return (
    <MainLayout
      showFab={true}
      onFabClick={() =>
        setIsModalOpen(true)
      }
    >
      <div className="dashboard-header">
        <h1>
          Halo, {username}
        </h1>

        <p>
          Pantau tugas pribadi dan tugas kelompokmu hari ini.
        </p>
      </div>

      <div className="summary-grid">
        <div className="summary-card compact-summary">
          <BsClipboardData />
          <div>
            <h3>Total Tasks</h3>
            <h1>{tasks.length}</h1>
            <p>Semua task</p>
          </div>
        </div>

        <div className="summary-card compact-summary">
          <BsPerson />
          <div>
            <h3>Personal</h3>
            <h1>{personalTasks.length}</h1>
            <p>Tugas mandiri</p>
          </div>
        </div>

        <div className="summary-card compact-summary">
          <BsPeople />
          <div>
            <h3>Team</h3>
            <h1>{teamTasks.length}</h1>
            <p>Workspace aktif</p>
          </div>
        </div>

        <div className="summary-card compact-summary">
          <BsCheckCircle />
          <div>
            <h3>Completed</h3>
            <h1>{completedTasks.length}</h1>
            <p>
              {tasks.length === 0
                ? "0%"
                : `${Math.round(
                    (completedTasks.length /
                      tasks.length) *
                      100
                  )}% selesai`}
            </p>
          </div>
        </div>
      </div>

      <MiniCalendar
        tasks={tasks}
        onDateClick={(dateString) => {
          setSelectedDate(dateString);
          setIsModalOpen(true);
        }}
      />

      <div className="deadline-card">
        <div className="deadline-header">
          <BsClock />
          <h3>Upcoming Deadlines</h3>
        </div>

        {upcomingTasks.length > 0 ? (
          <div className="deadline-list">
            {upcomingTasks.map((task) => {
              const risk =
                getRiskLevel(task);

              return (
                <div
                  className="deadline-item-modern"
                  key={task.id}
                >
                  <div>
                    <h4>{task.title}</h4>
                    <p>
                      {task.dueDate
                        ? new Date(
                            task.dueDate
                          ).toLocaleDateString()
                        : "No deadline"}
                    </p>
                  </div>

                  <span
                    className={`deadline-status ${risk.className}`}
                  >
                    {getDeadlineText(task)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="empty-dashboard-text">
            Belum ada deadline.
          </p>
        )}
      </div>

      <div className="dashboard-workspace-card">
        <div className="dashboard-section-title">
          <h2>Active Workspace</h2>
          <BsPeople />
        </div>

        {activeWorkspace ? (
          <div className="active-workspace-content">
            <div>
              <h3>{activeWorkspace.title}</h3>

              <p>
                {activeWorkspace.collaborators.length + 1} members • {activeWorkspace.status}
              </p>
            </div>

            <span
              className={`risk-badge ${activeRisk?.className}`}
            >
              {activeRisk?.label}
            </span>

            <div className="workspace-progress">
              <div className="workspace-progress-top">
                <span>
                  Checklist Progress
                </span>

                <strong>
                  {completedChecklist}/{totalChecklist} selesai
                </strong>
              </div>

              <div className="workspace-progress-track">
                <div
                  className="workspace-progress-fill"
                  style={{
                    width:
                      `${checklistProgress}%`,
                  }}
                />
              </div>

              <p>
                {checklistProgress}% progress
              </p>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/workspace/${activeWorkspace.id}`
                )
              }
            >
              Open Workspace
              <BsArrowRightCircle />
            </button>
          </div>
        ) : (
          <p className="empty-dashboard-text">
            Belum ada workspace aktif.
          </p>
        )}
      </div>

      <h2 className="task-section-title">
        Recent Tasks
      </h2>

      <div className="recent-task-list">
        {recentTasks.length > 0 ? (
          recentTasks.map((task) => {
            const isTeam =
              task.collaborators &&
              task.collaborators.length > 0;

            const risk =
              getRiskLevel(task);

            return (
              <div
                className="recent-task-item"
                key={task.id}
              >
                <div>
                  <h4>{task.title}</h4>

                  <p>
                    {isTeam
                      ? "Team Task"
                      : "Personal Task"} • {getDeadlineText(task)}
                  </p>
                </div>

                <span
                  className={`recent-risk ${risk.className}`}
                >
                  {risk.label}
                </span>
              </div>
            );
          })
        ) : (
          <p>Belum ada tugas</p>
        )}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        selectedDate={selectedDate}
        onClose={() =>
          setIsModalOpen(false)
        }
        onTaskCreated={fetchTasks}
      />
    </MainLayout>
  );
}

export default DashboardPage;