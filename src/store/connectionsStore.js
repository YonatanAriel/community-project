import { create } from 'zustand';
import {
  getConnectionRequests,
  acceptConnectionRequest,
  rejectConnectionRequest,
  getConnections,
  removeConnection,
  sendConnectionRequest,
} from '@/services/apiCalls';
import { useUserStore } from '@/store/userStore';

export const useConnectionsStore = create((set, get) => ({
  connectionRequests: [],
  connections: [],
  isLoading: false,
  error: null,

  transformRequestsWithUserData: (requests) => {
    return requests.map((request) => ({
      ...request,
      from_user: {
        id: request.from_user_id,
        user_name: request.from_user_name || `User ${request.from_user_id}`,
        photo_url: request.from_user_image || null,
        email: `user${request.from_user_id}@example.com`,
      },
      to_user: {
        id: request.to_user_id,
        user_name: request.to_user_name || `User ${request.to_user_id}`,
        photo_url: request.to_user_image || null,
        email: `user${request.to_user_id}@example.com`,
      },
    }));
  },

  processConnectionRequestsData: async (requestsData) => {
    if (!Array.isArray(requestsData)) {
      return [];
    }

    return get().transformRequestsWithUserData(requestsData);
  },

  fetchConnectionRequests: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getConnectionRequests();
      const requestsData = response.data?.data || response.data || [];

      const transformedRequests =
        await get().processConnectionRequestsData(requestsData);

      set({
        connectionRequests: transformedRequests,
        isLoading: false,
      });
    } catch (error) {
      set({
        connectionRequests: [],
        error: error.message || 'Failed to fetch connection requests',
        isLoading: false,
      });
    }
  },

  transformConnectionsWithUserData: (connections, currentUserId) => {
    return connections.map((connection) => {
      const isFromUser = connection.from_user_id === currentUserId;
      const otherUser = {
        id: isFromUser ? connection.to_user_id : connection.from_user_id,
        user_name: isFromUser
          ? connection.to_user_name
          : connection.from_user_name,
        photo_url: isFromUser
          ? connection.to_user_image
          : connection.from_user_image,
        email: `user${isFromUser ? connection.to_user_id : connection.from_user_id}@example.com`,
      };

      return {
        ...connection,
        user: otherUser,
        from_user: {
          id: connection.from_user_id,
          user_name:
            connection.from_user_name || `User ${connection.from_user_id}`,
          photo_url: connection.from_user_image || null,
          email: `user${connection.from_user_id}@example.com`,
        },
        to_user: {
          id: connection.to_user_id,
          user_name: connection.to_user_name || `User ${connection.to_user_id}`,
          photo_url: connection.to_user_image || null,
          email: `user${connection.to_user_id}@example.com`,
        },
        connected_at: connection.responded_at || connection.requested_at,
      };
    });
  },

  processConnectionsData: async (connectionsData, currentUserId) => {
    if (!Array.isArray(connectionsData)) {
      return [];
    }

    return get().transformConnectionsWithUserData(
      connectionsData,
      currentUserId
    );
  },

  fetchConnections: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getConnections();
      const connectionsData = response.data?.data || response.data || [];

      const currentUserId = useUserStore.getState().user?.id;

      const transformedConnections = await get().processConnectionsData(
        connectionsData,
        currentUserId
      );

      set({
        connections: transformedConnections,
        isLoading: false,
      });
    } catch (error) {
      set({
        connections: [],
        error: error.message || 'Failed to fetch connections',
        isLoading: false,
      });
    }
  },

  refreshDataAfterAccept: async () => {
    const { fetchConnectionRequests, fetchConnections } =
      useConnectionsStore.getState();
    await Promise.all([fetchConnectionRequests(), fetchConnections()]);
  },

  handleAcceptRequestAPI: async (requestId) => {
    const response = await acceptConnectionRequest(requestId);
    await get().refreshDataAfterAccept();
    return response;
  },

  acceptRequest: async (requestId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await get().handleAcceptRequestAPI(requestId);
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
