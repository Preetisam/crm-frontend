import axios from "axios"

const BASE_URL = "https://notification-backend.onrender.com"

export async function fetchTickets(){
    return await axios.get(`${BASE_URL}/crm/api/v1/tickets`, {
        headers: {
            'x-access-token' : localStorage.getItem("token")
        }
    })
}