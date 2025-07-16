import { Calendar, Clock, MapPin, Users, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventActionButtons from '@/components/ui/EventActionButtons';
import JoinEventButton from '@/components/ui/JoinEventButton';

function EventsList({ events = [], onView, onEdit, onDelete, onJoinEvent }) {
  if (events.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="mb-2 text-lg font-medium text-foreground">
          No events found
        </h3>
        <p className="text-muted-foreground">
          There are no events to display at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      {events.map((event) => (
        <div
          key={event.id}
          className="p-6 transition-shadow border rounded-lg shadow-sm bg-card hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="mb-2 text-lg font-semibold text-foreground">
                {event.title}
              </h4>
              <p className="mb-3 text-muted-foreground">
                {event.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees}/{event.maxAttendees}</span>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <span>Organizer: {event.organizer}</span>
              </div>
            </div>
            
            <div className="flex gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView?.(event.id)}
                className="flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                View
              </Button>
              
              <EventActionButtons
                eventId={event.id}
                onEdit={onEdit}
                onDelete={onDelete}
              />
              
              <JoinEventButton
                eventId={event.id}
                onJoinEvent={onJoinEvent}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventsList;
