import api from "../api/api";

export const login = (username, password) => {
  return api.post("/auth", {
    username,
    password
  });
};