// ========================================
// FILE: src/components/TaskCard.jsx
// ========================================

import PriorityBadge from "./PriorityBadge";

function TaskCard({
  task,
  onDelete,
}) {
  return (
    <div className="card">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>Status: {task.status}</p>

      <PriorityBadge
        priority={task.priority}
      />

      <p>
        SKS: {task.sks}
      </p>

      <p>
        Difficulty:
        {task.difficulty}
      </p>

      <button
        onClick={() =>
          onDelete(task.id)
        }
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;