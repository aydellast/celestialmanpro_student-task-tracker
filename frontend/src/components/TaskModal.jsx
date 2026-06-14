import {
  useState,
  useEffect,
} from "react";

import {
  createTask,
} from "../services/taskService";

import "../styles/task.css";

function TaskModal({

  isOpen,

  onClose,

  onTaskCreated,

  selectedDate,

}) {

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [sks, setSks] =
    useState(1);

  const [
    difficulty,
    setDifficulty,
  ] = useState(1);

  useEffect(() => {

    if (selectedDate) {

      setDueDate(
        selectedDate
      );

    }

  }, [selectedDate]);

  const resetForm = () => {

    setTitle("");

    setDescription("");

    setDueDate("");

    setSks(1);

    setDifficulty(1);

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await createTask({

          title,

          description,

          dueDate,

          sks,

          difficulty,

        });

        alert(
          "Task berhasil dibuat"
        );

        resetForm();

        onTaskCreated();

        onClose();

      } catch (error) {

        console.log(error);

        alert(
          "Gagal membuat task"
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
          Tambah Task
        </h2>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Judul Task"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            required
          />

          <textarea
            placeholder="Deskripsi"
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

          <label>
            SKS
          </label>

          <input
            type="number"
            min="1"
            max="6"
            value={sks}
            onChange={(e) =>
              setSks(
                e.target.value
              )
            }
          />

          <label>
            Difficulty
          </label>

          <input
            type="number"
            min="1"
            max="5"
            value={difficulty}
            onChange={(e) =>
              setDifficulty(
                e.target.value
              )
            }
          />

          <div className="modal-buttons">

            <button
              type="submit"
            >
              Simpan
            </button>

            <button
              type="button"

              onClick={() => {

                resetForm();

                onClose();

              }}

            >
              Batal
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default TaskModal;