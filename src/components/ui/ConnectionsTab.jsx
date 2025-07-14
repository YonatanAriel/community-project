import { Users, Clock, History } from 'lucide-react';
import TabNavigation from '@/components/ui/TabNavigation';
import TabContent from '@/components/ui/TabContent';

function ConnectionsTab({
  pendingRequests = [],
  connections = [],
  allRequests = [],
  activeTab,
  onTabChange,
  onAcceptRequest,
  onRejectRequest,
  onRemoveConnection,
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
    {
      id: 'history',
      label: 'History',
      icon: History,
      count: allRequests.length,
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
        allRequests={allRequests}
        onAcceptRequest={onAcceptRequest}
        onRejectRequest={onRejectRequest}
        onRemoveConnection={onRemoveConnection}
      />
    </div>
  );
}

export default ConnectionsTab;
