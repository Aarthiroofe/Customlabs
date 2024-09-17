
import axios from 'axios';

const BASE_URL = 'https://webhook.site'; 

export const commonPostMethod = async (path, data) => {
  try {
    const response = await axios.post(`${BASE_URL}${path}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`HTTP error! Status: ${error.response?.status} - ${error.message}`);
  }
};

export const commondGetMethod = async (path) => {
  try {
    const response = await axios.get(`${BASE_URL}${path}`);
    return response.data;
  } catch (error) {
    throw new Error(`HTTP error! Status: ${error.response?.status} - ${error.message}`);
  }
};
