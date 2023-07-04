import axios from 'axios';

const BASE_URL = 'https://project-crm.onrender.com'; 

export function fetchTickets(){
  const Tickets = axios.get(`${BASE_URL}/crm/app/v1/tickets/getAllTickets`,{
    headers:{
  "x-access-token":localStorage.getItem("Token")
    }
  })
  console.log(Tickets)
  return Tickets

}  
  
export async function getEngineerTicketsApi(engineerId) {
    try {
      const response = await axios.get(`${BASE_URL}/api/engineers/${engineerId}/tickets`, {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching engineer tickets:', error);
      throw new Error('Failed to fetch engineer tickets');
    }
  }
  
