import eventsApiClient from './eventsApiClient';

// ----- Events API -----

export const getEvents = async () => {
  try {
    return await eventsApiClient.get('/events');
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    return await eventsApiClient.get(`/events/${id}`);
  } catch (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    return await eventsApiClient.post('/events', eventData);
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    return await eventsApiClient.put(`/events/${id}`, eventData);
  } catch (error) {
    console.error(`Error updating event ${id}:`, error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    return await eventsApiClient.delete(`/events/${id}`);
  } catch (error) {
    console.error(`Error deleting event ${id}:`, error);
    throw error;
  }
};

// ----- Event Registrations API -----

export const registerForEvent = async (registrationData) => {
  try {
    return await eventsApiClient.post('/eventregistrations', registrationData);
  } catch (error) {
    console.error('Error registering for event:', error);
    throw error;
  }
};

export const cancelRegistration = async (registrationId) => {
  try {
    return await eventsApiClient.delete(
      `/eventregistrations/${registrationId}`
    );
  } catch (error) {
    console.error(`Error canceling registration ${registrationId}:`, error);
    throw error;
  }
};

export const getUserEventRegistrations = async (userId) => {
  try {
    // If your API supports filtering
    return await eventsApiClient.get(`/eventregistrations?userId=${userId}`);
  } catch (error) {
    console.error(`Error fetching registrations for user ${userId}:`, error);
    throw error;
  }
};
