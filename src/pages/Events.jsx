import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventsTab from '@/components/ui/EventsTab';
import NewEventForm from '@/components/ui/popups/NewEventForm';
import EventRegistrationForm from '@/components/ui/popups/EventRegistrationForm';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
} from '@/services/eventsService';

function Events() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-events');
  const [isNewEventFormOpen, setIsNewEventFormOpen] = useState(false);
  const [isEditEventFormOpen, setIsEditEventFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false);
  const [selectedEventForRegistration, setSelectedEventForRegistration] =
    useState(null);
  const [registrations, setRegistrations] = useState([]);

  // State for events
  const [myEvents, setMyEvents] = useState([]);

  // Format TimeSpan from backend (hh:mm:ss to hh:mm)
  const formatTimeSpan = (timeSpan) => {
    if (!timeSpan) return '';
    return timeSpan.substring(0, 5);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await getEvents();

        // Check if the response is an object with events property
        const eventsData =
          response && response.events
            ? response.events
            : Array.isArray(response)
              ? response
              : [];

        // Check if we have any events data
        if (!eventsData || eventsData.length === 0) {
          console.log('No events data returned from API');
          setMyEvents([]);
          return;
        }

        // Log what we received for debugging
        console.log('Events data received:', eventsData);

        // Map backend model to frontend format
        const mappedEvents = eventsData.map((event) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          date: new Date(event.date).toISOString().split('T')[0],
          time: formatTimeSpan(event.startTime),
          endTime: formatTimeSpan(event.endTime),
          location: event.location,
          organizer: 'System', // Default value
          attendees: 0, // This would need a separate API call or data inclusion
          maxAttendees:
            event.eventType === 'Meetup' ? event.maxParticipants : 100,
          eventType: event.eventType.toLowerCase(),
          isActive: event.isActive,
          imageUrl: event.imageUrl || 'https://via.placeholder.com/300',

          // Add event-type specific properties
          ...(event.eventType === 'Meetup' && {
            speakers: event.speakers,
            topic: event.topic,
            maxParticipants: event.maxParticipants,
          }),
          ...(event.eventType === 'Webinar' && {
            onlineLink: event.onlineLink,
            hostName: event.hostName,
            requiresRegistration: event.requiresRegistration,
          }),
          ...(event.eventType === 'Conference' && {
            mainSpeaker: event.mainSpeaker,
            sponsors: event.sponsors,
          }),
          ...(event.eventType === 'JobFair' && {
            employersList: event.employersList,
            boothsCount: event.boothsCount,
            hasResumeDrop: event.hasResumeDrop,
          }),
        }));

        setMyEvents(mappedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Set empty events array on error
        setMyEvents([]);
        // Show error message to user
        alert('Failed to load events. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events by date
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

  const handleDeleteEvent = async (eventId) => {
    try {
      setIsLoading(true);
      await deleteEvent(eventId);
      setMyEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error(`Error deleting event ${eventId}:`, error);
      alert(`Failed to delete event: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEvent = () => {
    setIsNewEventFormOpen(true);
  };

  const handleCloseNewEventForm = () => {
    setIsNewEventFormOpen(false);
  };

  const handleCloseEditEventForm = () => {
    setIsEditEventFormOpen(false);
    setEditingEvent(null);
  };

  const handleUpdateEvent = async (eventData) => {
    try {
      setIsLoading(true);

      // Map frontend model to backend DTO
      const eventDto = {
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        startTime: eventData.time,
        endTime: eventData.endTime,
        location: eventData.location,
        isActive: true,
        imageUrl: eventData.imageUrl || 'https://via.placeholder.com/300',
        eventType:
          eventData.eventType.charAt(0).toUpperCase() +
          eventData.eventType.slice(1),

        // Type-specific fields
        ...(eventData.eventType === 'meetup' && {
          speakers: eventData.speakers,
          topic: eventData.topic,
          maxParticipants: parseInt(eventData.maxParticipants) || 50,
        }),
        ...(eventData.eventType === 'webinar' && {
          onlineLink: eventData.onlineLink,
          hostName: eventData.hostName,
          requiresRegistration: eventData.requiresRegistration,
        }),
        ...(eventData.eventType === 'conference' && {
          mainSpeaker: eventData.mainSpeaker,
          sponsors: eventData.sponsors,
        }),
        ...(eventData.eventType === 'jobfair' && {
          employersList: eventData.employersList,
          boothsCount: parseInt(eventData.boothsCount) || 10,
          hasResumeDrop: eventData.hasResumeDrop,
        }),
      };

      const updatedEvent = await updateEvent(editingEvent.id, eventDto);

      setMyEvents((prev) =>
        prev.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                ...eventData,
                eventType: eventData.eventType.toLowerCase(),
              }
            : event
        )
      );

      setIsEditEventFormOpen(false);
      setEditingEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
      alert(`Failed to update event: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEvent = async (eventData) => {
    try {
      setIsLoading(true);

      // Map frontend model to backend DTO
      const eventDto = {
        title: eventData.title,
        description: eventData.description,
        date: eventData.date,
        startTime: eventData.time,
        endTime: eventData.endTime,
        location: eventData.location,
        isActive: true,
        imageUrl: eventData.imageUrl || 'https://via.placeholder.com/300',
        eventType:
          eventData.eventType.charAt(0).toUpperCase() +
          eventData.eventType.slice(1),

        // Type-specific fields
        ...(eventData.eventType === 'meetup' && {
          speakers: eventData.speakers,
          topic: eventData.topic,
          maxParticipants: parseInt(eventData.maxParticipants) || 50,
        }),
        ...(eventData.eventType === 'webinar' && {
          onlineLink: eventData.onlineLink,
          hostName: eventData.hostName,
          requiresRegistration: eventData.requiresRegistration,
        }),
        ...(eventData.eventType === 'conference' && {
          mainSpeaker: eventData.mainSpeaker,
          sponsors: eventData.sponsors,
        }),
        ...(eventData.eventType === 'jobfair' && {
          employersList: eventData.employersList,
          boothsCount: parseInt(eventData.boothsCount) || 10,
          hasResumeDrop: eventData.hasResumeDrop,
        }),
      };

      const createdEvent = await createEvent(eventDto);

      // Add new event to list
      const newEvent = {
        id: createdEvent.id,
        ...eventData,
        eventType: eventData.eventType.toLowerCase(),
        organizer: 'Me',
        attendees: 0,
        maxAttendees: eventData.maxAttendees || 50,
      };

      setMyEvents((prev) => [...prev, newEvent]);
      setIsNewEventFormOpen(false);
    } catch (error) {
      console.error('Error saving event:', error);
      alert(`Failed to create event: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinEvent = (eventId) => {
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

  const handleEventRegistration = async (registrationData) => {
    try {
      setIsLoading(true);

      console.log('Registration data:', registrationData);

      // שלב 1: יצירת רישום לאירוע עם ה-DTO בפורמט הנדרש על ידי שרת הדוט-נט
      const regDto = {
        eventId: registrationData.eventId,
        userId: 1, // אפשר להחליף למזהה משתמש אמיתי אם יש כזה
        fullName: registrationData.fullName,
        email: registrationData.email,
        registrationDate: new Date().toISOString(),
      };

      console.log('Sending registration data to server:', regDto);

      const response = await registerForEvent(regDto);

      console.log('Server response:', response);

      // Add to registrations list
      setRegistrations((prev) => [
        ...prev,
        {
          ...registrationData,
          id: response?.data?.id || response?.id || Date.now(), // השתמש במזהה מהשרת או צור זמני
        },
      ]);

      // Update attendee count for this event
      setMyEvents((prev) =>
        prev.map((event) =>
          event.id === registrationData.eventId
            ? { ...event, attendees: event.attendees + 1 }
            : event
        )
      );

      // Close form
      setIsRegistrationFormOpen(false);
      setSelectedEventForRegistration(null);

      // Show success message
      alert(`Successfully registered for "${registrationData.eventTitle}"!`);
    } catch (error) {
      console.error('Error registering for event:', error);
      if (
        error.response?.status === 409 ||
        error.message?.includes('already registered')
      ) {
        alert('You are already registered for this event.');
      } else {
        alert(`Registration failed: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
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
          />
        </div>

        {/* Floating Action Button */}
        <Button
          onClick={handleCreateEvent}
          className="fixed transition-shadow rounded-full shadow-lg bottom-6 right-6 w-14 h-14 hover:shadow-xl"
          size="icon"
          disabled={isNewEventFormOpen || isEditEventFormOpen}
        >
          <Plus className="w-6 h-6" />
        </Button>

        {/* New Event Form Modal */}
        {isNewEventFormOpen && (
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
        {isEditEventFormOpen && editingEvent && (
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
