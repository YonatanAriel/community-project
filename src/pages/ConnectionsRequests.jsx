import { useState, useEffect } from 'react';
import { useConnectionsStore } from '@/store/connectionsStore';
import ConnectionsTab from '@/components/ui/ConnectionsTab';
import PageHeader from '@/components/ui/PageHeader';

function ConnectionsRequests() {
  const [activeTab, setActiveTab] = useState('requests');
  const {
    acceptRequest,
    rejectRequest,
    removeConnection,
    getPendingRequests,
    getActiveConnections,
    fetchConnectionRequests,
    fetchConnections,
    isLoading,
    error,
    clearError,
  } = useConnectionsStore();

  const pendingRequests = getPendingRequests() || [];
  const activeConnections = getActiveConnections() || [];

  useEffect(() => {
    fetchConnectionRequests();
    fetchConnections();
  }, [fetchConnectionRequests, fetchConnections]);

  const handleAcceptRequest = async (requestId) => {
    try {
      await acceptRequest(requestId);
    } catch (error) {
      console.error('Failed to accept request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await rejectRequest(requestId);
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  const handleRemoveConnection = async (connectionId) => {
    try {
      await removeConnection(connectionId);
    } catch (error) {
      console.error('Failed to remove connection:', error);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    return () => {
      if (error) {
        clearError();
      }
    };
  }, [error, clearError]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 w-full px-8 py-8">
        <PageHeader
          title="Connections"
          description="Manage your connection requests and existing connections"
        />
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}
        <ConnectionsTab
          pendingRequests={pendingRequests}
          connections={activeConnections}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
          onRemoveConnection={handleRemoveConnection}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default ConnectionsRequests;
