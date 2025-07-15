import ConnectionRequestsList from '@/components/ui/ConnectionRequestsList';
import ConnectionsList from '@/components/ui/ConnectionsList';

function TabContent({
  activeTab,
  pendingRequests = [],
  connections = [],
  onAcceptRequest,
  onRejectRequest,
  onRemoveConnection,
  isLoading = false,
}) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }

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
      default:
        return null;
    }
  };

  return <div className="w-full space-y-4">{renderContent()}</div>;
}

export default TabContent;
