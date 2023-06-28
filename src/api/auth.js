import axios from "axios";
const BASE_URL = "https://backend-crm-yic4.onrender.com";

//signup
export async function userSignUp(data){
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signup`, data)
}
//integrate login ans signup apis

//sigin
export async function userLogin(data){
    return await axios.post(`${BASE_URL}/crm/api/v1/auth/signin`, data)
}