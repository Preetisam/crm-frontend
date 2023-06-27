import axios from "axios"

const BASE_URL = "https://crm-backend-z5m4.onrender.com"

export async function fetchTicket() {
  try {
    const response = await axios.get(`${BASE_URL}/crm/api/v1/tickets`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error occurred during fetching tickets: ", error.message);
    throw error;
  }
}

export async function createTicketApi(data) {
  try {
    const response = await axios.post(
      `${BASE_URL}/crm/api/v1/tickets`,
      data,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error occurred during creating ticket: ", error.message);
    throw error;
  }
}

export async function updateTicketApi(data, id) {
  try {
    const response = await axios.post(
      `${BASE_URL}/crm/api/v1/tickets/${id}`,
      data,
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error occurred during updating ticket: ", error.message);
    throw error;
  }
}

  