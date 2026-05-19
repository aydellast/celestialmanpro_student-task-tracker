// ========================================
// FILE: src/services/focusService.js
// ========================================

import api from "./api";

export const startFocusSession =
  async (data) => {
    const response = await api.post(
      "/focus/start",
      data
    );

    return response.data;
  };

export const endFocusSession =
  async (id) => {
    const response = await api.post(
      `/focus/end/${id}`
    );

    return response.data;
  };

export const getFocusHistory =
  async () => {
    const response = await api.get(
      "/focus/history"
    );

    return response.data;
  };