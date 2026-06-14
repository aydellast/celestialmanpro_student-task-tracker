import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  BsPeople,
  BsClipboardCheck,
  BsExclamationTriangle,
  BsArrowRightCircle,
} from "react-icons/bs";

import MainLayout from
"../components/layout/MainLayout";

import {
  joinTask,
} from
"../services/collaborationService";

import {
  getTasks,
} from "../services/taskService";

import "../styles/collaboration.css";

function CollaborationPage() {
  const navigate = useNavigate();

  const [taskCode,
    setTaskCode] =
    useState("");

  const [tasks,
    setTasks] =
    useState([]);

  const fetchTasks = async () => {
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

  const handleJoin =
    async (e) => {
      e.preventDefault();

      try {
        await joinTask(taskCode);

        alert(
          "Berhasil join shared task"
        );

        setTaskCode("");

        fetchTasks();
      } catch (error) {
        console.log(error);

        alert(
          "Kode task tidak valid atau kamu sudah join task ini"
        );
      }
    };

  const getRiskLevel = (task) => {
    if (task.status === "Done") {
      return {
        label: "Low Risk",
        className: "risk-low",
      };
    }

    const today =
      new Date();

    const deadline =
      new Date(task.dueDate);

    const diffTime =
      deadline.getTime() -
      today.getTime();

    const diffDays =
      Math.ceil(
        diffTime /
        (1000 * 60 * 60 * 24)
      );

    if (diffDays <= 3) {
      return {
        label: "High Risk",
        className: "risk-high",
      };
    }

    if (diffDays <= 7) {
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

  const sharedTasks =
    tasks.filter(
      (task) =>
        task.collaborators &&
        task.collaborators.length > 0
    );

  return (
    <MainLayout>
      <div className="collab-container">

        <div className="collab-header">
          <h1>
            Study Workspace
          </h1>

          <p>
            Kelola tugas kelompok, pantau anggota, dan lihat risiko deadline.
          </p>
        </div>

        <div className="join-card">
          <h2>
            Join Shared Task
          </h2>

          <p>
            Masukkan kode tugas yang dibagikan oleh teman kelompokmu.
          </p>

          <form
            onSubmit={handleJoin}
            className="join-form"
          >
            <input
              type="text"
              placeholder="Masukkan task code"
              value={taskCode}
              onChange={(e) =>
                setTaskCode(
                  e.target.value
                )
              }
            />

            <button type="submit">
              Join Workspace
            </button>
          </form>
        </div>

        <div className="workspace-section">
          <div className="section-title-row">
            <h2>
              Your Shared Workspaces
            </h2>

            <BsPeople />
          </div>

          {sharedTasks.length > 0 ? (

            sharedTasks.map((task) => {
              const risk =
                getRiskLevel(task);

              return (
                <div
                  className="workspace-card"
                  key={task.id}
                >
                  <div className="workspace-card-top">
                    <div>
                      <h3>
                        {task.title}
                      </h3>

                      <p>
                        {task.description ||
                          "Shared academic task"}
                      </p>
                    </div>

                    <span
                      className={`risk-badge ${risk.className}`}
                    >
                      {risk.label}
                    </span>
                  </div>

                  <div className="workspace-info-grid">
                    <div>
                      <BsPeople />
                      <span>
                        {task.collaborators.length + 1} Members
                      </span>
                    </div>

                    <div>
                      <BsClipboardCheck />
                      <span>
                        {task.status}
                      </span>
                    </div>

                    <div>
                      <BsExclamationTriangle />
                      <span>
                        {task.dueDate
                          ? new Date(
                              task.dueDate
                            ).toLocaleDateString()
                          : "No deadline"}
                      </span>
                    </div>
                  </div>

                  <button
                    className="open-workspace-btn"
                    onClick={() =>
                      navigate(
                        `/workspace/${task.id}`
                      )
                    }
                  >
                    Open Workspace
                    <BsArrowRightCircle />
                  </button>
                </div>
              );
            })

          ) : (

            <div className="empty-workspace">
              <h3>
                Belum ada shared workspace
              </h3>

              <p>
                Join task menggunakan kode agar tugas kelompok muncul di sini.
              </p>
            </div>

          )}
        </div>

      </div>
    </MainLayout>
  );
}

export default CollaborationPage;