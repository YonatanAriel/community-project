import axios from 'axios';

// Create a dedicated instance for the events microservice
const eventsApiClient = axios.create({
  baseURL: '/api', // Will use the proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor to extract data
eventsApiClient.interceptors.response.use(
  (response) => {
    // For successful responses, return just the data
    return response.data;
  },
  (error) => {
    // For errors, log them and reject the promise
    console.error('Events API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default eventsApiClient;
