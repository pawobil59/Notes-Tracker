//creating an intercpentor here. Its function is to intercept all requests sent and add the correct headers automatically 
//using axios for this

import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

//load an environment variable inside javascriot code
//start with key word "VITE" followed by the variable name 
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },

    (error) => {
        return Promise.reject(error)
    } 


)
export default api
