import API from "./authApi";

export const getMyVolunteerApplication = () => API.get("/auth/volunteer/application");
export const applyForVolunteer = (data) => API.post("/auth/volunteer/application", data);
export const getVolunteerApplications = () => API.get("/auth/admin/volunteer-applications");
export const reviewVolunteerApplication = (id, data) => API.patch(`/auth/admin/volunteer-applications/${id}`, data);
