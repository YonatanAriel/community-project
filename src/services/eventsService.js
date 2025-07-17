// filepath: src/services/eventsService.js
import eventsApiClient from './eventsApiClient';
import axios from 'axios';

// Get all events
export const getEvents = async () => {
  return await eventsApiClient.get('/'); // שים לב שזה ריק כי ה-baseURL כבר מכיל '/api/events'
};
// Create a new event
export const createEvent = async (eventData) => {
  return await eventsApiClient.post('/', eventData); // שוב, שים לב לדרך שבה אנחנו קוראים ל-endpoint
};

// Update an existing event
export const updateEvent = async (id, eventData) => {
  return await eventsApiClient.put(`/${id}`, eventData);
};

// Delete an event
export const deleteEvent = async (id) => {
  return await eventsApiClient.delete(`/${id}`);
};

// Register for an event
export const registerForEvent = async (registrationData) => {
  // שימוש בלקוח API נפרד עם הנתיב המדויק
  return await axios.post('/api/EventRegistrations', registrationData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Other event-related API calls can be added here
