import {
  BsClockHistory,
} from "react-icons/bs";

function UpcomingDeadlines({
  tasks,
}) {

  const upcomingTasks =
    [...tasks]

      .filter(
        (task) =>
          task.status !==
          "Done"
      )

      .sort(
        (a, b) =>
          new Date(
            a.dueDate
          ) -
          new Date(
            b.dueDate
          )
      )

      .slice(0, 3);

  return (

    <div className="deadline-card">

      <div className="deadline-header">

        <BsClockHistory />

        <h3>
          Upcoming Deadlines
        </h3>

      </div>

      {upcomingTasks.map(
        (task) => (

          <div
            key={task.id}

            className="deadline-item"
          >

            <div>

              <strong>
                {task.title}
              </strong>

              <p>
                {new Date(
                  task.dueDate
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

        )
      )}

    </div>

  );
}

export default UpcomingDeadlines;