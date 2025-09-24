import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Get all users
export const fetchUsers = () => api.get("/users");

// Add user (simulated)
export const addUser = (user) => api.post("/users", user);

// Edit user (simulated)
export const updateUser = (id, user) => api.put(`/users/${id}`, user);

// Delete user (simulated)
export const deleteUser = (id) => api.delete(`/users/${id}`);

export default api;
