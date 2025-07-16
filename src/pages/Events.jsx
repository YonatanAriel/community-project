import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import EventsTab from '@/components/ui/EventsTab';

function Events() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Mock data - יוחלף בנתונים אמיתיים
  const upcomingEvents = [];
  const finishedEvents = [];
  const myEvents = [];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">
            Events
          </h1>
        </div>
        <p className="text-muted-foreground">
          Manage all community events
        </p>
      </div>

      <EventsTab
        upcomingEvents={upcomingEvents}
        finishedEvents={finishedEvents}
        myEvents={myEvents}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isLoading={false}
      />
    </div>
  );
}

export default Events;
