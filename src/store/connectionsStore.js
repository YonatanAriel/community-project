import { create } from 'zustand';
import {
  connectionRequestsMockData,
  connectionsMockData,
} from '@/data/mockData';

export const useConnectionsStore = create((set, get) => ({
  connectionRequests: connectionRequestsMockData,
  connections: connectionsMockData,

  acceptRequest: (requestId) => {
    set((state) => {
      const request = state.connectionRequests.find((r) => r.id === requestId);
      if (!request) return state;

      const updatedRequests = state.connectionRequests.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'accepted',
              responded_at: new Date().toISOString(),
            }
          : r
      );

      const newConnection = {
        id: Date.now(),
        user: request.from_user,
        connected_at: new Date().toISOString(),
        status: 'connected',
      };

      return {
        ...state,
        connectionRequests: updatedRequests,
        connections: [...state.connections, newConnection],
      };
    });
  },

  rejectRequest: (requestId) => {
    set((state) => ({
      ...state,
      connectionRequests: state.connectionRequests.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: 'rejected',
              responded_at: new Date().toISOString(),
            }
          : r
      ),
    }));
  },

  removeConnection: (connectionId) => {
    set((state) => ({
      ...state,
      connections: state.connections.filter((c) => c.id !== connectionId),
    }));
  },

  getPendingRequests: () => {
    return get().connectionRequests.filter((r) => r.status === 'pending');
  },

  getActiveConnections: () => {
    return get().connections.filter((c) => c.status === 'connected');
  },

  getAllRequests: () => {
    return get().connectionRequests;
  },
}));
