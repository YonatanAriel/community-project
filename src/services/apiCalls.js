import api from './handleApiCalls';
import { API } from '@/constants/api';

export const authenticateWithLinkedIn = async (code) => {
  try {
    return await api.post('/auth/linkedin', { code });
  } catch (error) {
    console.error('Error authenticating with LinkedIn:', error);
    throw error;
  }
};

export const getConnectionRequests = async () => {
  try {
    return await api.get(API.ENDPOINTS.CONNECTION_REQUESTS);
  } catch (error) {
    console.error('Error fetching connection requests:', error);
    throw error;
  }
};

export const acceptConnectionRequest = async (requestId) => {
  try {
    return await api.put(
      `${API.ENDPOINTS.ACCEPT_CONNECTION_REQUEST}/${requestId}`
    );
  } catch (error) {
    console.error('Error accepting connection request:', error);
    throw error;
  }
};

export const rejectConnectionRequest = async (requestId) => {
  try {
    return await api.put(
      `${API.ENDPOINTS.REJECT_CONNECTION_REQUEST}/${requestId}`
    );
  } catch (error) {
    console.error('Error rejecting connection request:', error);
    throw error;
  }
};

export const getConnections = async () => {
  try {
    return await api.get(API.ENDPOINTS.CONNECTIONS);
  } catch (error) {
    console.error('Error fetching connections:', error);
    throw error;
  }
};

export const removeConnection = async (connectionId) => {
  try {
    return await api.delete(
      `${API.ENDPOINTS.REMOVE_CONNECTION}/${connectionId}`
    );
  } catch (error) {
    console.error('Error removing connection:', error);
    throw error;
  }
};

export const sendConnectionRequest = async (toUserId, reason) => {
  try {
    return await api.post(API.ENDPOINTS.CONNECTION_REQUESTS, {
      to_user_id: toUserId,
      reason,
    });
  } catch (error) {
    console.error('Error sending connection request:', error);
    throw error;
  }
};

export const getAiRecommendations = async (inputText) => {
  try {
    return await api.post(API.ENDPOINTS.AI_RECOMMENDATIONS, {
      input_text: inputText,
    });
  } catch (error) {
    console.error('Error fetching AI recommendations:', error);
    throw error;
  }
};
