// ========================================
// FILE: src/components/FocusTimer.jsx
// ========================================

import {
  useState,
} from "react";

import {
  startFocusSession,
} from "../services/focusService";

function FocusTimer() {
  const [duration, setDuration] =
    useState(25);

  const startFocus = async () => {
    try {
      await startFocusSession({
        duration,
      });

      alert(
        "Focus session started"
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Focus Mode</h2>

      <input
        type="number"
        value={duration}
        onChange={(e) =>
          setDuration(e.target.value)
        }
      />

      <button onClick={startFocus}>
        Start Focus
      </button>
    </div>
  );
}

export default FocusTimer;