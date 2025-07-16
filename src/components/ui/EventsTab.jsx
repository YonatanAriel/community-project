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
    <div className="w-full space-y-6">
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      <TabContent
        activeTab={activeTab}
        upcomingEvents={upcomingEvents}
        finishedEvents={finishedEvents}
        myEvents={myEvents}
        onViewEvent={onViewEvent}
        onEditEvent={onEditEvent}
        onDeleteEvent={onDeleteEvent}
        isLoading={isLoading}
      />
    </div>
  );
}

export default EventsTab;
