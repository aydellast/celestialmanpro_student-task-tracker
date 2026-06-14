import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  BsPeople,
  BsBarChart,
  BsExclamationTriangle,
  BsCheck2Circle,
} from "react-icons/bs";

import MainLayout from
"../components/layout/MainLayout";

import ChecklistPanel from
"../components/ChecklistPanel";

import {
  getCollaborators,
} from
"../services/collaborationService";

import "../styles/collaboration.css";

function WorkspacePage() {

  const { taskId } =
    useParams();

  const [workspace,
    setWorkspace] =
    useState(null);

  const [checklists,
    setChecklists] =
    useState([]);

  const fetchWorkspace =
    async () => {
      try {
        const response =
          await getCollaborators(
            taskId
          );

        setWorkspace(response);

      } catch (error) {
        console.log(error);

        alert(
          "Gagal mengambil data workspace"
        );
      }
    };

  useEffect(() => {
    fetchWorkspace();
  }, [taskId]);

  if (!workspace) {
    return (
      <MainLayout>
        <p>
          Loading workspace...
        </p>
      </MainLayout>
    );
  }

  const task =
    workspace.task;

  const owner =
    task.owner;

  const collaborators =
    workspace.collaborators || [];

  const members = [
    {
      id: owner.id,
      username: owner.username,
      email: owner.email,
      role: "Owner",
    },
    ...collaborators.map(
      (item) => ({
        id: item.user.id,
        username: item.user.username,
        email: item.user.email,
        role: "Collaborator",
      })
    ),
  ];

  const getDaysLeft = () => {
    if (!task.dueDate) {
      return null;
    }

    const today =
      new Date();

    const deadline =
      new Date(task.dueDate);

    const diffTime =
      deadline.getTime() -
      today.getTime();

    return Math.ceil(
      diffTime /
      (1000 * 60 * 60 * 24)
    );
  };

  const completedChecklist =
    checklists.filter(
      (item) => item.isDone
    ).length;

  const totalChecklist =
    checklists.length;

  const progressPercentage =
    totalChecklist === 0
      ? 0
      : Math.round(
          (completedChecklist /
            totalChecklist) *
            100
        );

  const getRisk = () => {
    if (task.status === "Done") {
      return {
        label: "Low Risk",
        className: "risk-low",
        description:
          "Task sudah selesai sehingga risiko keterlambatan rendah.",
      };
    }

    const daysLeft =
      getDaysLeft();

    if (daysLeft === null) {
      return {
        label: "Low Risk",
        className: "risk-low",
        description:
          "Task belum memiliki deadline.",
      };
    }

    if (
      daysLeft <= 3 &&
      progressPercentage < 70
    ) {
      return {
        label: "High Risk",
        className: "risk-high",
        description:
          "Deadline sangat dekat dan progress checklist masih rendah.",
      };
    }

    if (
      daysLeft <= 7 &&
      progressPercentage < 80
    ) {
      return {
        label: "Medium Risk",
        className: "risk-medium",
        description:
          "Deadline mulai mendekat, progress perlu dipantau aktif.",
      };
    }

    return {
      label: "Low Risk",
      className: "risk-low",
      description:
        "Progress dan deadline masih berada dalam kondisi aman.",
    };
  };

  const risk =
    getRisk();

  const contribution =
    members.map((member) => {
      const doneCount =
        checklists.filter(
          (item) =>
            item.isDone &&
            item.doneBy?.id ===
              member.id
        ).length;

      const percentage =
        completedChecklist === 0
          ? 0
          : Math.round(
              (doneCount /
                completedChecklist) *
                100
            );

      return {
        ...member,
        doneCount,
        percentage,
      };
    });

  return (
    <MainLayout>

      <div className="workspace-detail">

        <div className="workspace-hero-card">

          <h1>
            {task.title}
          </h1>

          <p>
            {task.description ||
              "Shared academic workspace"}
          </p>

          <div className="workspace-hero-meta">

            <span>
              {members.length} Members
            </span>

            <span>
              {task.status}
            </span>

            <span>
              {task.dueDate
                ? `${getDaysLeft()} days left`
                : "No deadline"}
            </span>

            <span>
              {progressPercentage}% Progress
            </span>

          </div>

        </div>

        <div className="workspace-panel">

          <div className="section-title-row">

            <h2>
              Members
            </h2>

            <BsPeople />

          </div>

          <div className="member-list">

            {members.map((member) => (

              <div
                className="member-item"
                key={member.id}
              >

                <div className="member-avatar">
                  {member.username
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <h4>
                    {member.username}
                  </h4>

                  <p>
                    {member.role}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        <ChecklistPanel

          taskId={task.id}

          onChecklistChange={
            setChecklists
          }

        />

        <div className="workspace-panel">

          <div className="section-title-row">

            <h2>
              Contribution Tracker
            </h2>

            <BsBarChart />

          </div>

          {contribution.map((member) => (

            <div
              className="contribution-item"
              key={member.id}
            >

              <div className="contribution-top">

                <span>
                  {member.username}
                </span>

                <strong>
                  {member.percentage}%
                </strong>

              </div>

              <div className="progress-track">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      `${member.percentage}%`,
                  }}
                />

              </div>

              <p className="contribution-note">

                {member.doneCount} checklist selesai

              </p>

            </div>

          ))}

        </div>

        <div className="workspace-panel">

          <div className="section-title-row">

            <h2>
              Deadline Risk
            </h2>

            <BsExclamationTriangle />

          </div>

          <div
            className={`risk-card ${risk.className}`}
          >

            <h3>
              {risk.label}
            </h3>

            <p>
              {risk.description}
            </p>

          </div>

        </div>

        <div className="workspace-panel">

          <div className="section-title-row">

            <h2>
              Shared Task Status
            </h2>

            <BsCheck2Circle />

          </div>

          <div className="shared-task-status">

            <span>
              Status
            </span>

            <strong>
              {task.status}
            </strong>

          </div>

          <div className="shared-task-status">

            <span>
              Priority
            </span>

            <strong>
              {task.priority?.name}
            </strong>

          </div>

          <div className="shared-task-status">

            <span>
              Progress
            </span>

            <strong>
              {completedChecklist}/{totalChecklist} Done
            </strong>

          </div>

          <div className="shared-task-status">

            <span>
              Task Code
            </span>

            <strong>
              {task.taskCode?.slice(0, 8)}...
            </strong>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default WorkspacePage;