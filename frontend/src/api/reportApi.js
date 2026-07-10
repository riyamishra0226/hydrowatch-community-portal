import API from "./authApi";

export const createReport = (reportData) => {
  return API.post("/reports", reportData);
};

export const getMyReports = (userId) => {
  return API.get(`/reports/user/${userId}`);
};

export const deleteReport = (id) => {
  return API.delete(`/reports/${id}`);
};  

export const getCampaigns = () => API.get("/campaigns");

export const getDashboardStats = (userId) => {
  return API.get(`/reports/dashboard/${userId}`);
};