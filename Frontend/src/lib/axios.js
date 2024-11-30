import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"http://localhost:8000/api",
    withCredentials:true //Enables sending and receiving cookies or other credentials with cross-origin requests.
})