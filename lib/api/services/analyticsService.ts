import api from "../axiosInstance";

export const analyticsService = {
  getDashboard: (month: number, year: number) =>
    api.get("/analytics/dashboard", { params: { month, year } }),
};
