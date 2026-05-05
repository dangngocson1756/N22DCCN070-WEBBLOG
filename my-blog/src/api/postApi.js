import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5134/api",
});

export const getAllPosts = () => API.get("/posts");
export const getPostById = (id) => API.get(`/posts/${id}`);
export const createPost = (data) => API.post("/posts", data);
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
