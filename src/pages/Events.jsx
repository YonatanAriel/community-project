import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventsTab from '@/components/ui/EventsTab';
import NewEventForm from '@/components/ui/popups/NewEventForm';
import EventRegistrationForm from '@/components/ui/popups/EventRegistrationForm';
import { useUserStore } from '@/store/userStore';

function Events() {
  const navigate = useNavigate();
  const { isAdmin } = useUserStore();
  const [activeTab, setActiveTab] = useState('my-events');
  const [isNewEventFormOpen, setIsNewEventFormOpen] = useState(false);
  const [isEditEventFormOpen, setIsEditEventFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false);
  const [selectedEventForRegistration, setSelectedEventForRegistration] =
    useState(null);
  const [registrations, setRegistrations] = useState([]);

  // State for events - prepared for future API integration
  const [myEvents, setMyEvents] = useState([
    {
      id: 1,
      title: 'Tech Meetup 2025',
      description: 'Join us for the latest tech trends and networking',
      date: '2025-08-15',
      time: '18:00',
      location: 'Tel Aviv Tech Hub',
      organizer: 'Me',
      attendees: 45,
      maxAttendees: 100,
      eventType: 'meetup',
    },
    {
      id: 2,
      title: 'React Workshop',
      description: 'Advanced React patterns and best practices',
      date: '2025-08-20',
      time: '10:00',
      location: 'Online',
      organizer: 'Me',
      attendees: 78,
      maxAttendees: 150,
      eventType: 'webinar',
    },
    {
      id: 3,
      title: 'JavaScript Conference',
      description: 'The biggest JS conference in Israel',
      date: '2025-07-10',
      time: '09:00',
      location: 'Jerusalem Convention Center',
      organizer: 'Me',
      attendees: 250,
      maxAttendees: 300,
      eventType: 'conference',
    },
    {
      id: 4,
      title: 'Community Networking Event',
      description: 'Building connections in the tech community',
      date: '2025-09-01',
      time: '19:00',
      location: 'Herzliya Pituach',
      organizer: 'Me',
      attendees: 25,
      maxAttendees: 50,
      eventType: 'jobfair',
    },
  ]);

  // TODO: Replace with actual API call
  useEffect(() => {
    // const fetchEvents = async () => {
    //   try {
    //     setIsLoading(true);
    //     const events = await getMyEvents();
    //     setMyEvents(events);
    //   } catch (error) {
    //     console.error('Error fetching events:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };
    // fetchEvents();
  }, []);

  // סינון אירועים לפי תאריך
  const today = new Date();
  const upcomingEvents = myEvents.filter(
    (event) => new Date(event.date) > today
  );
  const finishedEvents = myEvents.filter(
    (event) => new Date(event.date) <= today
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleViewEvent = (eventId) => {
    console.log('View event:', eventId);
    // Navigate to event details page
  };

  const handleEditEvent = (eventId) => {
    const eventToEdit = myEvents.find((event) => event.id === eventId);
    if (eventToEdit) {
      setEditingEvent(eventToEdit);
      setIsEditEventFormOpen(true);
    }
  };

  const handleDeleteEvent = (eventId) => {
    console.log('Delete event:', eventId);
    setMyEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  const handleCreateEvent = () => {
    if (!isAdmin) {
      alert('Only admins can create events');
      return;
    }
    setIsNewEventFormOpen(true);
  };

  const handleCloseNewEventForm = () => {
    setIsNewEventFormOpen(false);
  };

  const handleCloseEditEventForm = () => {
    setIsEditEventFormOpen(false);
    setEditingEvent(null);
  };

  const handleUpdateEvent = (eventData) => {
    console.log('Update event:', eventData);

    setMyEvents((prev) =>
      prev.map((event) =>
        event.id === editingEvent.id ? { ...event, ...eventData } : event
      )
    );

    setIsEditEventFormOpen(false);
    setEditingEvent(null);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      // Generate temporary ID (in production, this will come from the server)
      const newEvent = {
        id: Date.now(), // Temporary ID generation
        ...eventData,
        organizer: 'Me',
        attendees: 0, // Default value
        maxAttendees: eventData.maxAttendees || 50, // Default to 50 if not provided
      };

      // TODO: Replace with actual API call
      // const savedEvent = await createEvent(newEvent);
      // setMyEvents(prev => [...prev, savedEvent]);

      // For now, add to local state
      setMyEvents((prev) => [...prev, newEvent]);

      console.log('Event saved successfully:', newEvent);
      setIsNewEventFormOpen(false);
    } catch (error) {
      console.error('Error saving event:', error);
      // TODO: Show error message to user
    }
  };

  const handleJoinEvent = (eventId) => {
    console.log('Join event:', eventId);
    const eventToJoin = myEvents.find((event) => event.id === eventId);
    if (eventToJoin) {
      setSelectedEventForRegistration(eventToJoin);
      setIsRegistrationFormOpen(true);
    }
  };

  const handleCloseRegistrationForm = () => {
    setIsRegistrationFormOpen(false);
    setSelectedEventForRegistration(null);
  };

  const handleEventRegistration = (registrationData) => {
    console.log('Event registration:', registrationData);

    // Add to registrations list
    setRegistrations((prev) => [...prev, registrationData]);

    // TODO: Send to server
    // const response = await registerForEvent(registrationData);

    // Close form
    setIsRegistrationFormOpen(false);
    setSelectedEventForRegistration(null);

    // Show success message
    alert(`Successfully registered for "${registrationData.eventTitle}"!`);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="container flex flex-col flex-1 px-4 py-8 mx-auto">
        <div className="flex-shrink-0 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Events</h1>
          </div>
          <p className="text-muted-foreground">Manage all community events</p>
        </div>

        <div
          className={`flex-1 min-h-0 ${isNewEventFormOpen || isEditEventFormOpen ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <EventsTab
            upcomingEvents={upcomingEvents}
            finishedEvents={finishedEvents}
            myEvents={myEvents}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onViewEvent={handleViewEvent}
            onEditEvent={handleEditEvent}
            onDeleteEvent={handleDeleteEvent}
            isLoading={isLoading}
            onJoinEvent={handleJoinEvent}
            isAdmin={isAdmin}
          />
        </div>

        {/* Floating Action Button */}
        {isAdmin && (
          <Button
            onClick={handleCreateEvent}
            className="fixed transition-shadow rounded-full shadow-lg bottom-6 right-6 w-14 h-14 hover:shadow-xl"
            size="icon"
            disabled={isNewEventFormOpen || isEditEventFormOpen}
          >
            <Plus className="w-6 h-6" />
          </Button>
        )}

        {/* New Event Form Modal */}
        {isNewEventFormOpen && isAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={handleCloseNewEventForm}
            />
            <div className="relative bg-card border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <NewEventForm
                onSave={handleSaveEvent}
                onCancel={handleCloseNewEventForm}
              />
            </div>
          </div>
        )}

        {/* Edit Event Form Modal */}
        {isEditEventFormOpen && editingEvent && isAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={handleCloseEditEventForm}
            />
            <div className="relative bg-card border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <NewEventForm
                initialData={editingEvent}
                onSave={handleUpdateEvent}
                onCancel={handleCloseEditEventForm}
                isEditing={true}
              />
            </div>
          </div>
        )}

        {/* Event Registration Form Modal */}
        {isRegistrationFormOpen && selectedEventForRegistration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={handleCloseRegistrationForm}
            />
            <div className="relative bg-card border rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <EventRegistrationForm
                event={selectedEventForRegistration}
                onRegister={handleEventRegistration}
                onCancel={handleCloseRegistrationForm}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
