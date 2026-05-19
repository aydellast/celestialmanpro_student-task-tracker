// ========================================
// FILE: src/services/collaborationService.js
// ========================================

import api from "./api";

export const joinTask = async (
  taskCode
) => {
  const response = await api.post(
    "/collaboration/join",
    {
      taskCode,
    }
  );

  return response.data;
};

export const getCollaborators =
  async (taskId) => {
    const response = await api.get(
      `/collaboration/task/${taskId}`
    );

    return response.data;
  };