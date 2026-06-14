import {
  useState,
} from "react";

import {
  BsCalendar3,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

import "../styles/dashboard.css";

function MiniCalendar({
  onDateClick,
  tasks = [],
}) {
  const [currentDate,
    setCurrentDate] =
    useState(new Date());

  const today =
    new Date();

  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();

  const monthName =
    currentDate.toLocaleString(
      "en-US",
      {
        month: "long",
      }
    );

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();

  const days =
    Array.from(
      {
        length: daysInMonth,
      },
      (_, i) => i + 1
    );

  const blanks =
    Array.from(
      {
        length: firstDay,
      },
      (_, i) => i
    );

  const goPrevMonth =
    () => {
      setCurrentDate(
        new Date(
          year,
          month - 1,
          1
        )
      );
    };

  const goNextMonth =
    () => {
      setCurrentDate(
        new Date(
          year,
          month + 1,
          1
        )
      );
    };

  const formatDate =
    (day) => {
      const mm =
        String(month + 1)
          .padStart(2, "0");

      const dd =
        String(day)
          .padStart(2, "0");

      return `${year}-${mm}-${dd}`;
    };

  const hasTaskOnDate =
    (day) => {
      const dateString =
        formatDate(day);

      return tasks.some((task) => {
        if (!task.dueDate) {
          return false;
        }

        const taskDate =
          new Date(task.dueDate)
            .toISOString()
            .slice(0, 10);

        return taskDate === dateString;
      });
    };

  const isToday =
    (day) =>
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day;

  return (
    <div className="calendar-card">
      <div className="calendar-header calendar-header-modern">
        <div>
          <BsCalendar3 />
          <h3>
            {monthName} {year}
          </h3>
        </div>

        <div className="calendar-nav">
          <button onClick={goPrevMonth}>
            <BsChevronLeft />
          </button>

          <button onClick={goNextMonth}>
            <BsChevronRight />
          </button>
        </div>
      </div>

      <div className="calendar-weekdays">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      <div className="calendar-grid">
        {blanks.map((blank) => (
          <div
            className="calendar-empty"
            key={`blank-${blank}`}
          />
        ))}

        {days.map((day) => (
          <button
            key={day}
            className={
              isToday(day)
                ? "calendar-day active"
                : "calendar-day"
            }
            onClick={() =>
              onDateClick(
                formatDate(day)
              )
            }
          >
            <span>{day}</span>

            {hasTaskOnDate(day) && (
              <span className="calendar-dot" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MiniCalendar;