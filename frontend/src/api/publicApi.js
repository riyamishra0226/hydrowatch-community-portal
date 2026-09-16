import API from "./authApi";

export const getPublicStats = () => API.get("/reports/public/stats");
export const getPublicCampaigns = () => API.get("/campaigns");
