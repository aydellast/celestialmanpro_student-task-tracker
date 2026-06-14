import {
  useState,
} from "react";

import {
  updateTask,
} from "../services/taskService";

import "../styles/task.css";

function EditTaskModal({
  isOpen,
  onClose,
  task,
  onTaskUpdated,
}) {

  const [title,
    setTitle] =
    useState(task.title);

  const [
    description,
    setDescription,
  ] = useState(
    task.description
  );

  const [dueDate,
    setDueDate] =
    useState(
      task.dueDate
      ?.split("T")[0]
    );

  const [status,
    setStatus] =
    useState(task.status);

  const handleUpdate =
    async (e) => {

      e.preventDefault();

      try {

        await updateTask(
          task.id,
          {
            title,
            description,
            dueDate,
            status,
          }
        );

        alert(
          "Task berhasil diupdate 🚀"
        );

        onTaskUpdated();

        onClose();

      } catch (error) {

        console.log(error);

        alert(
          "Gagal update task"
        );

      }
    };

  if (!isOpen) {
    return null;
  }

  return (

    <div className="modal-overlay">

      <div className="task-modal">

        <h2>
          Edit Task
        </h2>

        <form
          onSubmit={
            handleUpdate
          }
        >

          <input
            type="text"

            value={title}

            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <textarea

            value={description}

            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <input
            type="date"

            value={dueDate}

            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
          />

          <select
            value={status}

            onChange={(e) =>
              setStatus(
                e.target.value
              )
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

          <div className="modal-buttons">

            <button
              type="submit"
            >
              Save
            </button>

            <button
              type="button"

              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditTaskModal;