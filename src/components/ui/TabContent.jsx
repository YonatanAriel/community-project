import ConnectionRequestsList from '@/components/ui/ConnectionRequestsList';
import ConnectionsList from '@/components/ui/ConnectionsList';
import ConnectionsHistory from '@/components/ui/ConnectionsHistory';

function TabContent({
  activeTab,
  pendingRequests,
  connections,
  allRequests,
  onAcceptRequest,
  onRejectRequest,
  onRemoveConnection,
}) {
  const renderContent = () => {
    switch (activeTab) {
      case 'requests':
        return (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Connection Requests
            </h3>
            <ConnectionRequestsList
              requests={pendingRequests}
              onAccept={onAcceptRequest}
              onReject={onRejectRequest}
            />
          </div>
        );
      case 'connections':
        return (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              My Connections
            </h3>
            <ConnectionsList
              connections={connections}
              onRemove={onRemoveConnection}
            />
          </div>
        );
      case 'history':
        return <ConnectionsHistory requests={allRequests} />;
      default:
        return null;
    }
  };

  return <div className="w-full space-y-4">{renderContent()}</div>;
}

export default TabContent;
