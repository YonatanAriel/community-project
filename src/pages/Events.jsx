import { useState } from 'react';
import { Button } from '@/components/ui/button';

function Events() {
  const [events, setEvents] = useState([]);

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          אירועים
        </h1>
        <p className="text-muted-foreground">
          נהל את כל האירועים של הקהילה
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700">
            צור אירוע חדש
          </Button>
          <Button variant="outline">
            סינון
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          סך הכל: {events.length} אירועים
        </div>
      </div>

      {/* Events List */}
      <div className="border rounded-lg shadow bg-card">
        {events.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              אין אירועים עדיין
            </h3>
            <p className="mb-4 text-muted-foreground">
              התחל ליצור אירועים חדשים עבור הקהילה
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              צור אירוע ראשון
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {events.map((event) => (
              <div key={event.id} className="p-6 hover:bg-muted/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-medium text-foreground">
                      {event.title}
                    </h3>
                    <p className="mb-2 text-muted-foreground">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>📅 {event.date}</span>
                      <span>⏰ {event.time}</span>
                      <span>📍 {event.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      ערוך
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      מחק
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
