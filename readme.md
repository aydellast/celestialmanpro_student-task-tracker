# Student Task Tracker

Web-based student task management application built to help students organize assignments, manage priorities, improve focus, and collaborate with teammates.

---

# Features

## 1. Authentication

Users can:

* Register account
* Login securely
* Manage personal tasks

---

## 2. Task Management

Users can:

* Create tasks
* Edit tasks
* Delete tasks
* View task list
* Add task descriptions
* Set deadlines
* Customize labels

---

## 3. Task Priority System

Tasks are grouped into priorities:

* High
* Medium
* Low

Each priority includes its own color indicator.

---

## 4. Focus Mode

Users can:

* Start focus sessions
* Track study duration
* Connect focus sessions to specific tasks

---

## 5. Task Collaboration

Users can:

* Share task codes
* Collaborate on tasks with other users
* Join shared task groups

---

# Tech Stack

## Backend

* Node.js
* Express.js
* Prisma ORM
* MySQL (XAMPP)
* TypeScript

## Database

* MySQL

## ORM

* Prisma

---

# Database Design

Main tables:

* User
* Priority
* Task
* FocusSession
* TaskCollaborator

Relations:

* One user can have many tasks
* One task has one priority
* One task can have many focus sessions
* Many users can collaborate on many tasks

---

# Prisma Schema Features

## Enum Status

Task status uses enum for safer validation:

```prisma
enum TaskStatus {
  Todo
  In_Progress
  Done
}
```

---

# Installation Guide

## 1. Clone Repository

```bash
git clone <repository-url>
```

---

## 2. Open Backend Folder

```bash
cd backend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create `.env` file:

```env
DATABASE_URL="mysql://root:@localhost:3306/dbstudent_task_tracker"
```

---

## 5. Run Prisma Migration

```bash
npx prisma migrate dev
```

---

## 6. Run Prisma Studio

```bash
npx prisma studio
```

---

# Initial Priority Data

```sql
INSERT INTO Priority (name, colorCode)
VALUES
('High', '#FF0000'),
('Medium', '#FFA500'),
('Low', '#00FF00');
```

---

# Project Structure

```text
backend/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

---

# Current Progress

## Completed

* Prisma setup
* MySQL database connection
* Database migration
* ERD implementation
* Initial database schema

## In Progress

* Authentication API
* Task CRUD API
* Focus mode API
* Collaboration API

---

# Team Notes

This project is developed collaboratively for academic purposes and focuses on improving student productivity and task organization.

---

# Authors

Student Task Tracker Development Team
