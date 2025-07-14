import { useState } from 'react';
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
    getAllRequests,
  } = useConnectionsStore();

  const pendingRequests = getPendingRequests();
  const activeConnections = getActiveConnections();
  const allRequests = getAllRequests();

  const handleAcceptRequest = (requestId) => {
    acceptRequest(requestId);
  };

  const handleRejectRequest = (requestId) => {
    rejectRequest(requestId);
  };

  const handleRemoveConnection = (connectionId) => {
    removeConnection(connectionId);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 w-full px-8 py-8">
        <PageHeader
          title="Connections"
          description="Manage your connection requests and existing connections"
        />
        <ConnectionsTab
          pendingRequests={pendingRequests}
          connections={activeConnections}
          allRequests={allRequests}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
          onRemoveConnection={handleRemoveConnection}
        />
      </div>
    </div>
  );
}
// //

export default ConnectionsRequests;
