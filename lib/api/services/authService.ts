import api from "../axiosInstance";
export const authService = {
  register: (data: { fullName: string; email: string; password: string }) =>
    api.post("/users/register-user", data),
  login: (data: { email: string; password: string }) =>
    api.post("/users/login-user", data),
  logout: () => api.post("/users/logout-user"),
  refreshAccessToken: () => api.post("/users/refresh-access-token"),
};
