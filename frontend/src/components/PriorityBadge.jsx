// ========================================
// FILE: src/components/PriorityBadge.jsx
// ========================================

function PriorityBadge({
  priority,
}) {
  if (!priority) {
    return null;
  }

  return (
    <span>
      {priority.name}
    </span>
  );
}

export default PriorityBadge;