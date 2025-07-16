import { Calendar, Clock, User } from 'lucide-react';
import TabNavigation from '@/components/ui/TabNavigation';
import TabContent from '@/components/ui/TabContent';

function EventsTab({
  upcomingEvents = [],
  finishedEvents = [],
  myEvents = [],
  activeTab,
  onTabChange,
  onViewEvent,
  onEditEvent,
  onDeleteEvent,
  isLoading = false,
  onJoinEvent,
}) {
  const tabs = [
    {
      id: 'my-events',
      label: 'My Events',
      icon: User,
      count: myEvents.length,
    },
    {
      id: 'upcoming',
      label: 'Upcoming Events',
      icon: Calendar,
      count: upcomingEvents.length,
    },
    {
      id: 'finished',
      label: 'Finished Events',
      icon: Clock,
      count: finishedEvents.length,
    },
  ];

  return (
    <div className="flex flex-col w-full h-full space-y-6">
      <div className="flex-shrink-0">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </div>

      <div className="flex-1 min-h-0">
        <TabContent
          activeTab={activeTab}
          upcomingEvents={upcomingEvents}
          finishedEvents={finishedEvents}
          myEvents={myEvents}
          onViewEvent={onViewEvent}
          onEditEvent={onEditEvent}
          onDeleteEvent={onDeleteEvent}
          isLoading={isLoading}
          onJoinEvent={onJoinEvent}
        />
      </div>
    </div>
  );
}

export default EventsTab;
