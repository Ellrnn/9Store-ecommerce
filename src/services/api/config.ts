import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const api = axios.create({ baseURL: API_BASE_URL });
