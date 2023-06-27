import axios from "axios"

const BASE_URL = "https://crm-backend-z5m4.onrender.com"

export async function fetchTicket() {
    return await axios.get(`${BASE_URL}/crm/api/v1/tickets`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
  }
  export async function createTicketApi(data){
    return await axios.post(`${BASE_URL}/crm/api/v1/tickets`,data, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
    }

    export async function updateTicketApi(data,id){
      return await axios.post(`${BASE_URL}/crm/api/v1/tickets/${id}`,data, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
      }
  