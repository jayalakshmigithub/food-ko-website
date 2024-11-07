import axios from 'axios'
import config from '../config/config.js'

const BASE_URL =config.API_URL
console.log('api',config.API_URL)
const createAxiosInstance=(baseURL)=>{
    console.log('baseurl',baseURL)
    return axios.create({
        baseURL,
        headers : {'Content-Type':'application/json'},
        withCredentials:true
    })
}

export const axiosPrivate =createAxiosInstance(BASE_URL)
export const axiosUser = createAxiosInstance(`${BASE_URL}/user`)



 
