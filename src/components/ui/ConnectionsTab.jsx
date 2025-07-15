import { Users, Clock } from 'lucide-react';
import TabNavigation from '@/components/ui/TabNavigation';
import TabContent from '@/components/ui/TabContent';

function ConnectionsTab({
  pendingRequests = [],
  connections = [],
  activeTab,
  onTabChange,
  onAcceptRequest,
  onRejectRequest,
  onRemoveConnection,
  isLoading = false,
}) {
  const tabs = [
    {
      id: 'requests',
      label: 'Requests',
      icon: Clock,
      count: pendingRequests.length,
    },
    {
      id: 'connections',
      label: 'Connections',
      icon: Users,
      count: connections.length,
    },
  ];

  return (
    <div className="w-full space-y-6">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      <TabContent
        activeTab={activeTab}
        pendingRequests={pendingRequests}
        connections={connections}
        onAcceptRequest={onAcceptRequest}
        onRejectRequest={onRejectRequest}
        onRemoveConnection={onRemoveConnection}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ConnectionsTab;
