//creating an intercpentor here. Its function is to intercept all requests sent and add the correct headers automatically 
//using axios for this

import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

//service URL from choreo to help connect the backend to the frontend
const apiUrl = "/choreo-apis/notetracker/backend/rest-api-be2/v1"

//load an environment variable inside javascript code
//start with key word "VITE" followed by the variable name 

//
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
  });

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },

    (error) => {
        return Promise.reject(error)
    } 


)
export default api
