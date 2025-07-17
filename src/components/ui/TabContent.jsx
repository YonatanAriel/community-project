import ConnectionRequestsList from '@/components/ui/ConnectionRequestsList';
import ConnectionsList from '@/components/ui/ConnectionsList';
import EventsList from '@/components/ui/EventsList';

function TabContent({
  activeTab,
  pendingRequests = [],
  connections = [],
  myEvents = [],
  upcomingEvents = [],
  finishedEvents = [],
  onAcceptRequest,
  onRejectRequest,
  onRemoveConnection,
  onViewEvent,
  onEditEvent,
  onDeleteEvent,
  isLoading = false,
  onJoinEvent,
  isAdmin = false,
}) {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-primary"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'my-events':
        return (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              My Events
            </h3>
            <EventsList
              events={myEvents}
              onView={onViewEvent}
              onEdit={onEditEvent}
              onDelete={onDeleteEvent}
              onJoinEvent={onJoinEvent}
              isAdmin={isAdmin}
            />
          </div>
        );
      case 'upcoming':
        return (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Upcoming Events
            </h3>
            <EventsList
              events={upcomingEvents}
              onView={onViewEvent}
              onEdit={onEditEvent}
              onDelete={onDeleteEvent}
              onJoinEvent={onJoinEvent}
              isAdmin={isAdmin}
            />
          </div>
        );
      case 'finished':
        return (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Finished Events
            </h3>
            <EventsList
              events={finishedEvents}
              onView={onViewEvent}
              onEdit={onEditEvent}
              onDelete={onDeleteEvent}
              onJoinEvent={onJoinEvent}
              isAdmin={isAdmin}
            />
          </div>
        );
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
