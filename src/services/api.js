import axios from "axios";

const api = axios.create({
    baseURL: "https://sistema-de-fichas-backend.onrender.com"
});

export default api;