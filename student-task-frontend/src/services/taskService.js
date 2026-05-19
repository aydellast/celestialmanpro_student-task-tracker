import axios from "axios";

const API_URL = "http://localhost:3000/api/tasks";

// ======================
// GET TASKS
// ======================
export const getTasks = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ======================
// CREATE TASK
// ======================
export const createTask = async (taskData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(API_URL, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ======================
// DELETE TASK
// ======================
export const deleteTask = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ======================
// UPDATE TASK
// ======================
export const updateTask = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};