// ========================================
// FILE: src/pages/CollaborationPage.jsx
// ========================================

import {
  useState,
} from "react";

import Navbar from "../components/Navbar";

import {
  joinTask,
} from "../services/collaborationService";

function CollaborationPage() {
  const [taskCode, setTaskCode] =
    useState("");

  const handleJoin =
    async () => {
      try {
        await joinTask(taskCode);

        alert(
          "Berhasil join task"
        );
      } catch (error) {
        alert("Gagal join");
      }
    };

  return (
    <div>
      <Navbar />

      <div className="container">
        <h1>Task Collaboration</h1>

        <input
          type="text"
          placeholder="Task Code"
          value={taskCode}
          onChange={(e) =>
            setTaskCode(
              e.target.value
            )
          }
        />

        <button onClick={handleJoin}>
          Join Task
        </button>
      </div>
    </div>
  );
}

export default CollaborationPage;