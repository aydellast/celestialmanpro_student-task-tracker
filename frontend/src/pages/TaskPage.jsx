import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  BsSearch,
  BsFilter,
} from "react-icons/bs";

import MainLayout from "../components/layout/MainLayout";

import TaskCard from "../components/TaskCard";

import TaskModal from "../components/TaskModal";

import {
  getTasks,
} from "../services/taskService";

import "../styles/task.css";

function TaskPage() {

  const [tasks,
    setTasks] =
    useState([]);

  const [isModalOpen,
    setIsModalOpen] =
    useState(false);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  const [filter,
    setFilter] =
    useState("All");

  const fetchTasks =
    async () => {
      try {
        const response =
          await getTasks();

        setTasks(
          response.tasks || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks =
    useMemo(() => {
      return tasks.filter((task) => {
        const isTeamTask =
          task.collaborators &&
          task.collaborators.length > 0;

        const matchSearch =
          task.title
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            ) ||
          task.description
            ?.toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchFilter =
          filter === "All" ||
          (
            filter === "Personal" &&
            !isTeamTask
          ) ||
          (
            filter === "Team" &&
            isTeamTask
          ) ||
          task.status === filter;

        return matchSearch && matchFilter;
      });
    }, [
      tasks,
      searchTerm,
      filter,
    ]);

  return (
    <MainLayout
      showFab={true}
      onFabClick={() =>
        setIsModalOpen(true)
      }
    >

      <div className="task-page-header">

        <h1>
          Manage Your Tasks
        </h1>

        <p>
          Tambah, edit, filter, dan pantau seluruh tugasmu.
        </p>

      </div>

      <div className="task-toolbar">

        <div className="task-search-box">

          <BsSearch />

          <input
            type="text"
            placeholder="Cari tugas..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
          />

        </div>

        <div className="task-filter-label">

          <BsFilter />

          <span>
            Filter
          </span>

        </div>

      </div>

      <div className="task-filter-tabs">

        {[
          "All",
          "Personal",
          "Team",
          "Todo",
          "In_Progress",
          "Done",
        ].map((item) => (

          <button
            key={item}
            className={
              filter === item
                ? "filter-tab active"
                : "filter-tab"
            }
            onClick={() =>
              setFilter(item)
            }
          >
            {item === "In_Progress"
              ? "In Progress"
              : item}
          </button>

        ))}

      </div>

      <div className="task-count-card">

        <strong>
          {filteredTasks.length}
        </strong>

        <span>
          task ditampilkan dari {tasks.length} total task
        </span>

      </div>

      <div className="task-list">

        {filteredTasks.length > 0 ? (

          filteredTasks.map((task) => (

            <TaskCard
              key={task.id}
              task={task}
              onTaskUpdated={
                fetchTasks
              }
            />

          ))

        ) : (

          <div className="empty-task-state">

            <h3>
              Tidak ada task
            </h3>

            <p>
              Coba ubah filter atau tambahkan task baru.
            </p>

          </div>

        )}

      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onTaskCreated={
          fetchTasks
        }
      />

    </MainLayout>
  );
}

export default TaskPage;