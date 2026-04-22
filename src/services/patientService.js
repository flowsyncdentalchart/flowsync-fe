import api from "../api/axios";

export const getAllPatients = async (page, size, searchQuery) => {
  const { data } = await api.get("/api/patient", {
    params: { page, size, search: searchQuery }, 
  });
  return data;
};

export const getRecentPatients = async () => {
  const { data } = await api.get("/api/patient/recent");
  return data;
}


export const createPatient = async (patientData) => {
  const response = await api.post("/api/patient", patientData);
  return response.data;
};