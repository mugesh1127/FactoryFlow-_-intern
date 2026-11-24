
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Dashboard API
export const getDashboard = () => API.get("/dashboard");

// Orders API
export const getOrders = () => API.get("/orders");
export const addOrder = (data) => API.post("/orders", data);
export const updateOrder = (id, data) => API.put(`/orders/${id}`, data);
export const deleteOrder = (id) => API.delete(`/orders/${id}`);

// Employees API
export const getEmployees = () => API.get("/employees");
export const addEmployee = (data) => API.post("/employees", data);
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

// Inventory API
export const getInventory = () => API.get("/inventory");
export const addInventory = (data) => API.post("/inventory", data);
export const updateInventory = (id, data) => API.put(`/inventory/${id}`, data);
export const deleteInventory = (id) => API.delete(`/inventory/${id}`);

// Production API
export const getProduction = () => API.get("/production");
export const addProduction = (data) => API.post("/production", data);
export const updateProduction = (id, data) => API.put(`/production/${id}`, data);
export const deleteProduction = (id) => API.delete(`/production/${id}`);

export default API;
