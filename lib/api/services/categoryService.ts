import api from "../axiosInstance";

export const categoryService = {
  getCategories: () => api.get("/categories/get-user-categories"),
};
