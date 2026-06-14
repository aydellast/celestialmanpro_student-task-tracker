import {
  useEffect,
  useState,
} from "react";

import {
  startFocusSession,
  endFocusSession,
  getActiveFocusSession,
} from "../services/focusService";

import "../styles/focus.css";

function FocusTimer() {

  const [selectedMinutes,
    setSelectedMinutes] =
    useState(25);

  const [remainingSeconds,
    setRemainingSeconds] =
    useState(25 * 60);

  const [activeSession,
    setActiveSession] =
    useState(null);

  const [isRunning,
    setIsRunning] =
    useState(false);

  const calculateRemaining =
    (endTime) => {
      const remaining =
        Math.max(
          0,
          Math.floor(
            (
              new Date(endTime).getTime() -
              Date.now()
            ) / 1000
          )
        );

      return remaining;
    };

  const syncActiveSession =
    async () => {
      try {
        const response =
          await getActiveFocusSession();

        if (response.focusSession) {
          const session =
            response.focusSession;

          const remaining =
            calculateRemaining(
              session.endTime
            );

          if (remaining > 0) {
            setActiveSession(session);

            setRemainingSeconds(
              remaining
            );

            setIsRunning(true);

            localStorage.setItem(
              "focusSessionId",
              session.id
            );

            localStorage.setItem(
              "focusEndTime",
              session.endTime
            );

            localStorage.setItem(
              "focusDuration",
              session.duration
            );
          } else {
            setIsRunning(false);
            setActiveSession(null);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    syncActiveSession();
  }, []);

  useEffect(() => {
    let timer;

    if (isRunning && activeSession) {
      timer = setInterval(() => {
        const endTime =
          localStorage.getItem(
            "focusEndTime"
          ) || activeSession.endTime;

        const remaining =
          calculateRemaining(
            endTime
          );

        setRemainingSeconds(
          remaining
        );

        if (remaining <= 0) {
          clearInterval(timer);

          setIsRunning(false);

          setActiveSession(null);

          localStorage.removeItem(
            "focusSessionId"
          );

          localStorage.removeItem(
            "focusEndTime"
          );

          localStorage.removeItem(
            "focusDuration"
          );

          alert(
            "Focus session selesai"
          );
        }
      }, 1000);
    }

    return () =>
      clearInterval(timer);

  }, [
    isRunning,
    activeSession,
  ]);

  const startTimer =
    async () => {
      try {
        const response =
          await startFocusSession({
            duration:
              selectedMinutes,
          });

        const session =
          response.focusSession;

        const remaining =
          calculateRemaining(
            session.endTime
          );

        setActiveSession(
          session
        );

        setRemainingSeconds(
          remaining
        );

        setIsRunning(true);

        localStorage.setItem(
          "focusSessionId",
          session.id
        );

        localStorage.setItem(
          "focusEndTime",
          session.endTime
        );

        localStorage.setItem(
          "focusDuration",
          session.duration
        );

      } catch (error) {
        console.log(error);

        alert(
          "Gagal memulai focus session"
        );
      }
    };

  const pauseTimer =
    () => {
      setIsRunning(false);
    };

  const resumeTimer =
    () => {
      if (activeSession) {
        setIsRunning(true);
      }
    };

  const resetTimer =
    async () => {
      try {
        if (activeSession) {
          await endFocusSession(
            activeSession.id
          );
        }

        setIsRunning(false);

        setActiveSession(null);

        setRemainingSeconds(
          selectedMinutes * 60
        );

        localStorage.removeItem(
          "focusSessionId"
        );

        localStorage.removeItem(
          "focusEndTime"
        );

        localStorage.removeItem(
          "focusDuration"
        );

      } catch (error) {
        console.log(error);
      }
    };

  const handleChangeTimer =
    (value) => {
      if (isRunning) {
        alert(
          "Pause atau reset timer dulu sebelum mengubah durasi"
        );

        return;
      }

      setSelectedMinutes(
        value
      );

      setRemainingSeconds(
        value * 60
      );
    };

  const minutes =
    Math.floor(
      remainingSeconds / 60
    );

  const seconds =
    remainingSeconds % 60;

  const progress =
    selectedMinutes === 0
      ? 0
      : Math.max(
          0,
          Math.min(
            100,
            100 -
              (
                remainingSeconds /
                (selectedMinutes * 60)
              ) *
                100
          )
        );

  return (
    <div className="focus-container">

      <div className="focus-card">

        <h1>
          Focus Mode
        </h1>

        <p>
          Timer tetap berjalan walaupun kamu pindah halaman.
        </p>

        <div className="timer-presets">

          {[25, 45, 60].map(
            (value) => (

              <button
                key={value}
                onClick={() =>
                  handleChangeTimer(value)
                }
                className={
                  selectedMinutes === value
                    ? "active-preset"
                    : ""
                }
              >
                {value}
              </button>

            )
          )}

        </div>

        <div className="custom-timer">

          <input
            type="number"
            min="1"
            value={
              selectedMinutes
            }
            onChange={(e) =>
              handleChangeTimer(
                Number(
                  e.target.value
                )
              )
            }
          />

          <span>
            minutes
          </span>

        </div>

        <div className="timer-circle">

          <div className="timer-inner">

            <h2>
              {String(minutes)
                .padStart(2, "0")}
              :
              {String(seconds)
                .padStart(2, "0")}
            </h2>

            <p>
              {isRunning
                ? "Stay focused!"
                : activeSession
                  ? "Paused"
                  : "Ready"}
            </p>

          </div>

        </div>

        <div className="focus-progress-track">

          <div
            className="focus-progress-fill"
            style={{
              width:
                `${progress}%`,
            }}
          />

        </div>

        <div className="timer-buttons">

          {!activeSession && (

            <button
              onClick={
                startTimer
              }
            >
              Start
            </button>

          )}

          {activeSession &&
            !isRunning && (

              <button
                onClick={
                  resumeTimer
                }
              >
                Resume
              </button>

            )}

          {activeSession &&
            isRunning && (

              <button
                onClick={
                  pauseTimer
                }
              >
                Pause
              </button>

            )}

          <button
            onClick={
              resetTimer
            }
          >
            Reset
          </button>

        </div>

      </div>

    </div>
  );
}

export default FocusTimer;