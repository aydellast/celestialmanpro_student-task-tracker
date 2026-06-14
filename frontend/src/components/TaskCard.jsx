import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  BsCalendar3,
  BsPeople,
  BsPerson,
  BsBoxArrowUpRight,
  BsClipboard,
  BsTrash,
} from "react-icons/bs";

import {
  deleteTask,
  updateTask,
} from "../services/taskService";

import EditTaskModal from "./EditTaskModal";

import "../styles/task.css";

function TaskCard({
  task,
  onTaskUpdated,
  compact = false,
}) {

  const navigate =
    useNavigate();

  const [
    isEditModalOpen,
    setIsEditModalOpen,
  ] = useState(false);

  const isTeamTask =
    task.collaborators &&
    task.collaborators.length > 0;

  const handleDelete =
    async () => {
      const confirmDelete =
        window.confirm(
          "Hapus task ini?"
        );

      if (!confirmDelete) {
        return;
      }

      try {
        await deleteTask(
          task.id
        );

        onTaskUpdated();
      } catch (error) {
        console.log(error);

        alert(
          "Gagal menghapus task"
        );
      }
    };

  const handleStatusChange =
    async (e) => {
      try {
        await updateTask(
          task.id,
          {
            title: task.title,
            description:
              task.description,
            dueDate:
              task.dueDate,
            sks:
              task.sks,
            difficulty:
              task.difficulty,
            customLabel:
              task.customLabel,
            status:
              e.target.value,
          }
        );

        onTaskUpdated();
      } catch (error) {
        console.log(error);

        alert(
          "Gagal update status"
        );
      }
    };

  return (
    <>
      <div
        className={
          compact
            ? "task-card compact"
            : "task-card"
        }
      >

        <div className="task-top">

          <div>

            <div className="task-title-row">

              <h3>
                {task.title}
              </h3>

              <span
                className={
                  isTeamTask
                    ? "task-type-badge team"
                    : "task-type-badge personal"
                }
              >
                {isTeamTask ? (
                  <>
                    <BsPeople />
                    Team
                  </>
                ) : (
                  <>
                    <BsPerson />
                    Personal
                  </>
                )}
              </span>

            </div>

            <p>
              {task.description ||
                "Tidak ada deskripsi"}
            </p>

          </div>

          <div className="task-header-right">

            <span
              className={`
        priority-badge
        ${task.priority?.name?.toLowerCase()}
      `}
            >
              {task.priority?.name ||
                "None"}
            </span>

            {!compact && (

              <button
                className="delete-icon-btn"
                onClick={handleDelete}
              >
                <BsTrash />
              </button>

            )}

          </div>

        </div>

        <div className="task-status">

          <select
            value={task.status}
            onChange={
              handleStatusChange
            }
          >
            <option value="Todo">
              Todo
            </option>

            <option value="In_Progress">
              In Progress
            </option>

            <option value="Done">
              Done
            </option>
          </select>

        </div>

        <div className="task-meta-grid">

          <div>
            <BsCalendar3 />

            <span>
              {task.dueDate
                ? new Date(
                  task.dueDate
                ).toLocaleDateString()
                : "No deadline"}
            </span>
          </div>

          <div>
            <BsClipboard />

            <span>
              SKS {task.sks}
            </span>
          </div>

          <div>
            <BsPeople />

            <span>
              {isTeamTask
                ? `${task.collaborators.length + 1} Members`
                : "Individual"}
            </span>
          </div>

        </div>

        {!compact && (

          <div className="task-code">

            <span>
              Code:{" "}
              {task.taskCode?.slice(
                0,
                8
              )}
              ...
            </span>

            <button
              className="copy-btn"
              onClick={() => {
                navigator.clipboard.writeText(
                  task.taskCode
                );

                alert(
                  "Code copied"
                );
              }}
            >
              Copy
            </button>

          </div>

        )}



        <div className="task-actions-vertical">

          {isTeamTask && (

            <button
              className="workspace-btn"
              onClick={() =>
                navigate(
                  `/workspace/${task.id}`
                )
              }
            >
              Workspace
              <BsBoxArrowUpRight />
            </button>

          )}

          <button
            className="edit-btn"
            onClick={() =>
              setIsEditModalOpen(true)
            }
          >
            Edit Task
          </button>

        </div>

      </div>

      <EditTaskModal
        isOpen={
          isEditModalOpen
        }
        onClose={() =>
          setIsEditModalOpen(false)
        }
        task={task}
        onTaskUpdated={
          onTaskUpdated
        }
      />
    </>
  );
}

export default TaskCard;