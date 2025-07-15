import { create } from 'zustand';
import {
  getConnectionRequests,
  acceptConnectionRequest,
  rejectConnectionRequest,
  getConnections,
  removeConnection,
  sendConnectionRequest,
} from '@/services/apiCalls';

export const useConnectionsStore = create((set, get) => ({
  connectionRequests: [],
  connections: [],
  users: {},
  isLoading: false,
  error: null,

  getUserData: (userId, userName) => {
    const users = get().users;
    return (
      users[userId] || {
        id: userId,
        user_name: userName || `User ${userId}`,
        email: `user${userId}@example.com`,
        photo_url: null,
      }
    );
  },

  fetchUserData: async (userIds) => {
    try {
      const newUsers = {};
      userIds.forEach((userId) => {
        newUsers[userId] = {
          id: userId,
          user_name: `User ${userId}`,
          email: `user${userId}@example.com`,
          photo_url: null,
        };
      });

      set((state) => ({
        ...state,
        users: { ...state.users, ...newUsers },
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },

  fetchConnectionRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getConnectionRequests();
      const requestsData = response.data?.data || response.data || [];

      if (Array.isArray(requestsData)) {
        const userIds = new Set();
        requestsData.forEach((request) => {
          if (request.from_user_id) userIds.add(request.from_user_id);
          if (request.to_user_id) userIds.add(request.to_user_id);
        });

        await get().fetchUserData(Array.from(userIds));

        const transformedRequests = requestsData.map((request) => ({
          ...request,
          from_user:
            request.from_user ||
            get().getUserData(request.from_user_id, request.from_user_name),
          to_user:
            request.to_user ||
            get().getUserData(request.to_user_id, request.to_user_name),
        }));

        set({
          connectionRequests: transformedRequests,
          isLoading: false,
        });
      } else {
        set({
          connectionRequests: [],
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        connectionRequests: [],
        error: error.message || 'Failed to fetch connection requests',
        isLoading: false,
      });
    }
  },

  fetchConnections: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getConnections();
      const connectionsData = response.data?.data || response.data || [];

      if (Array.isArray(connectionsData)) {
        const userIds = new Set();
        connectionsData.forEach((connection) => {
          if (connection.from_user_id) userIds.add(connection.from_user_id);
          if (connection.to_user_id) userIds.add(connection.to_user_id);
        });

        await get().fetchUserData(Array.from(userIds));

        const transformedConnections = connectionsData.map((connection) => ({
          ...connection,
          user: connection.user || get().getUserData(connection.from_user_id),
          from_user:
            connection.from_user || get().getUserData(connection.from_user_id),
          to_user:
            connection.to_user || get().getUserData(connection.to_user_id),
          connected_at: connection.responded_at || connection.requested_at,
        }));

        set({
          connections: transformedConnections,
          isLoading: false,
        });
      } else {
        set({
          connections: [],
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        connections: [],
        error: error.message || 'Failed to fetch connections',
        isLoading: false,
      });
    }
  },

  acceptRequest: async (requestId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await acceptConnectionRequest(requestId);

      const { fetchConnectionRequests, fetchConnections } =
        useConnectionsStore.getState();
      await Promise.all([fetchConnectionRequests(), fetchConnections()]);

      set({ isLoading: false });
      return response;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to accept request',
        isLoading: false,
      });
      throw error;
    }
  },

  rejectRequest: async (requestId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await rejectConnectionRequest(requestId);

      const { fetchConnectionRequests } = useConnectionsStore.getState();
      await fetchConnectionRequests();

      set({ isLoading: false });
      return response;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to reject request',
        isLoading: false,
      });
      throw error;
    }
  },

  removeConnection: async (connectionId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await removeConnection(connectionId);

      const { fetchConnections } = useConnectionsStore.getState();
      await fetchConnections();

      set({ isLoading: false });
      return response;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to remove connection',
        isLoading: false,
      });
      throw error;
    }
  },

  sendConnectionRequest: async (toUserId, reason) => {
    set({ isLoading: true, error: null });
    try {
      const response = await sendConnectionRequest(toUserId, reason);

      const { fetchConnectionRequests } = useConnectionsStore.getState();
      await fetchConnectionRequests();

      set({ isLoading: false });
      return response;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          'Failed to send connection request',
        isLoading: false,
      });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  getPendingRequests: () => {
    const requests = get().connectionRequests;
    return Array.isArray(requests)
      ? requests.filter((r) => r.status === 'pending')
      : [];
  },

  getActiveConnections: () => {
    const connections = get().connections;
    return Array.isArray(connections)
      ? connections.filter((c) => c.status === 'accepted')
      : [];
  },
}));
