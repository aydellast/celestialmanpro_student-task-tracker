import {
  useEffect,
  useState,
} from "react";

import {
  BsCheck2Square,
  BsPlusCircle,
  BsTrash,
} from "react-icons/bs";

import {
  getTaskChecklists,
  createTaskChecklist,
  toggleTaskChecklist,
  deleteTaskChecklist,
} from "../services/checklistService";

function ChecklistPanel({
  taskId,
  onChecklistChange,
}) {

  const [checklists,
    setChecklists] =
    useState([]);

  const [title,
    setTitle] =
    useState("");

  const fetchChecklists =
    async () => {
      try {
        const response =
          await getTaskChecklists(
            taskId
          );

        setChecklists(
          response.checklists
        );

        if (onChecklistChange) {
          onChecklistChange(
            response.checklists
          );
        }

      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    if (taskId) {
      fetchChecklists();
    }
  }, [taskId]);

  const handleAdd =
    async (e) => {
      e.preventDefault();

      if (!title.trim()) {
        return;
      }

      try {
        await createTaskChecklist(
          taskId,
          title
        );

        setTitle("");

        fetchChecklists();

      } catch (error) {
        console.log(error);

        alert(
          "Gagal menambahkan checklist"
        );
      }
    };

  const handleToggle =
    async (checklistId) => {
      try {
        await toggleTaskChecklist(
          checklistId
        );

        fetchChecklists();

      } catch (error) {
        console.log(error);

        alert(
          "Gagal mengubah checklist"
        );
      }
    };

  const handleDelete =
    async (checklistId) => {
      const confirmDelete =
        window.confirm(
          "Hapus checklist ini?"
        );

      if (!confirmDelete) {
        return;
      }

      try {
        await deleteTaskChecklist(
          checklistId
        );

        fetchChecklists();

      } catch (error) {
        console.log(error);

        alert(
          "Gagal menghapus checklist"
        );
      }
    };

  return (

    <div className="workspace-panel">

      <div className="section-title-row">

        <h2>
          Shared Checklist
        </h2>

        <BsCheck2Square />

      </div>

      <form
        className="checklist-form"
        onSubmit={handleAdd}
      >

        <input
          type="text"
          placeholder="Tambah item pekerjaan..."
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <button type="submit">
          <BsPlusCircle />
        </button>

      </form>

      <div className="checklist-list">

        {checklists.length > 0 ? (

          checklists.map((item) => (

            <div
              key={item.id}
              className={
                item.isDone
                  ? "checklist-item done"
                  : "checklist-item"
              }
            >

              <button
                className="checklist-toggle"
                onClick={() =>
                  handleToggle(
                    item.id
                  )
                }
              >
                {item.isDone
                  ? "✓"
                  : ""}
              </button>

              <div className="checklist-content">

                <h4>
                  {item.title}
                </h4>

                <p>
                  {item.isDone
                    ? `Done by ${item.doneBy?.username || "Member"}`
                    : "Belum selesai"}
                </p>

              </div>

              <button
                className="checklist-delete"
                onClick={() =>
                  handleDelete(
                    item.id
                  )
                }
              >
                <BsTrash />
              </button>

            </div>

          ))

        ) : (

          <div className="empty-checklist">

            <p>
              Belum ada checklist.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default ChecklistPanel;