import axios from 'axios';

const BASE_URL = 'https://backend-crm-yic4.onrender.com';

export async function fetchEngineers() {
  try {
    const response = await axios.get(`${BASE_URL}/api/engineers`, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching engineer data:', error);
    throw new Error('Failed to fetch engineer data');
  }
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
  
