import api from "./api";

export const getTaskChecklists = async (taskId) => {
  const response = await api.get(
    `/checklists/task/${taskId}`
  );

  return response.data;
};

export const createTaskChecklist = async (
  taskId,
  title
) => {
  const response = await api.post(
    `/checklists/task/${taskId}`,
    {
      title,
    }
  );

  return response.data;
};

export const toggleTaskChecklist = async (
  checklistId
) => {
  const response = await api.patch(
    `/checklists/${checklistId}/toggle`
  );

  return response.data;
};

export const deleteTaskChecklist = async (
  checklistId
) => {
  const response = await api.delete(
    `/checklists/${checklistId}`
  );

  return response.data;
};