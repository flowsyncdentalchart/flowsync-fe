import api from "../api/axios";

export const getAllPatients = async () => {
  const response = await api.get("/api/patient");
  return response.data;
};