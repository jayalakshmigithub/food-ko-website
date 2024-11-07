import axios from "axios";
import config from "../config/config.js";


const USER_API_URL = config.USER_API_URL;



const createAxiosInstance = (baseURL) => {
    return axios.create({
        baseURL,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,  
    });
};

const userAxiosInstance = createAxiosInstance(USER_API_URL); 
export  default userAxiosInstance
