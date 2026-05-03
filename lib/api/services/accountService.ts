import api from "../axiosInstance";

export const accountService = {
  getAllAccounts: () => api.get("/accounts/get-user-accounts"),
};
