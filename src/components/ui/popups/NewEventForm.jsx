import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

function NewEventForm({ onSave, onCancel, initialData = null, isEditing = false }) {
  const [formData, setFormData] = useState({
    // Basic fields - always required
    title: '',
    description: '',
    date: '',
    location: '',
    eventType: '',
    imageUrl: '',
    
    // Dynamic fields based on event type
    startTime: '',
    endTime: '',
    speakers: '',
    topic: '',
    maxParticipants: '',
    onlineLink: '',
    hostName: '',
    requiresRegistration: false,
    employersList: '',
    boothsCount: '',
    hasResumeDrop: false,
    mainSpeaker: '',
    sponsors: ''
  });

  // Load initial data for editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const eventTypes = [
    { value: 'meetup', label: 'Meetup' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'jobfair', label: 'Job Fair' },
    { value: 'conference', label: 'Conference' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Build the event object with only relevant fields
    const eventData = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      eventType: formData.eventType,
      ...(formData.imageUrl && { imageUrl: formData.imageUrl })
    };

    // Add event-type specific fields
    switch (formData.eventType) {
      case 'meetup':
        eventData.startTime = formData.startTime;
        eventData.endTime = formData.endTime;
        eventData.speakers = formData.speakers;
        eventData.topic = formData.topic;
        eventData.maxParticipants = formData.maxParticipants;
        break;
      case 'webinar':
        eventData.startTime = formData.startTime;
        eventData.endTime = formData.endTime;
        eventData.onlineLink = formData.onlineLink;
        eventData.hostName = formData.hostName;
        eventData.requiresRegistration = formData.requiresRegistration;
        break;
      case 'jobfair':
        eventData.startTime = formData.startTime;
        eventData.endTime = formData.endTime;
        eventData.employersList = formData.employersList;
        eventData.boothsCount = formData.boothsCount;
        eventData.hasResumeDrop = formData.hasResumeDrop;
        break;
      case 'conference':
        eventData.startTime = formData.startTime;
        eventData.endTime = formData.endTime;
        eventData.mainSpeaker = formData.mainSpeaker;
        eventData.sponsors = formData.sponsors;
        break;
    }

    onSave(eventData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const renderEventTypeFields = () => {
    switch (formData.eventType) {
      case 'meetup':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-foreground">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-foreground">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-foreground">
                Speakers
              </label>
              <input
                type="text"
                name="speakers"
                value={formData.speakers}
                onChange={handleChange}
                placeholder="Speaker names separated by commas"
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-foreground">
                Topic
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-foreground">
                Maximum Participants
              </label>
              <input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </>
        );
      
      case 'webinar':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-foreground">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-foreground">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-foreground">
                Online Link
              </label>
              <input
                type="url"
                name="onlineLink"
                value={formData.onlineLink}
                onChange={handleChange}
                placeholder="https://zoom.us/..."
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-foreground">
                Host Name
              </label>
              <input
                type="text"
                name="hostName"
                value={formData.hostName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="requiresRegistration"
                checked={formData.requiresRegistration}
                onChange={handleChange}
                className="w-4 h-4 rounded text-primary border-border focus:ring-primary"
              />
              <label className="text-sm font-medium text-foreground">
                Requires Registration
              </label>
            </div>
          </>
        );
      
      case 'jobfair':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-foreground">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-foreground">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-foreground">
                Employers List
              </label>
              <textarea
                name="employersList"
                value={formData.employersList}
                onChange={handleChange}
                rows={3}
                placeholder="List of participating employers"
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-foreground">
                Number of Booths
              </label>
              <input
                type="number"
                name="boothsCount"
                value={formData.boothsCount}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="hasResumeDrop"
                checked={formData.hasResumeDrop}
                onChange={handleChange}
                className="w-4 h-4 rounded text-primary border-border focus:ring-primary"
              />
              <label className="text-sm font-medium text-foreground">
                Has Resume Drop
              </label>
            </div>
          </>
        );
      
      case 'conference':
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-foreground">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-foreground">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-foreground">
                Main Speaker
              </label>
              <input
                type="text"
                name="mainSpeaker"
                value={formData.mainSpeaker}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-foreground">
                Sponsors
              </label>
              <textarea
                name="sponsors"
                value={formData.sponsors}
                onChange={handleChange}
                rows={3}
                placeholder="List of sponsors"
                className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {isEditing ? 'Edit Event' : 'Create New Event'}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="p-2"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Fields - Always Required */}
        <div>
          <label className="block mb-1 text-sm font-medium text-foreground">
            Event Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-foreground">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-foreground">
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-foreground">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-foreground">
            Event Type *
          </label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Event Type</option>
            {eventTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-foreground">
            Image URL (Optional)
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Dynamic Fields Based on Event Type */}
        {formData.eventType && (
          <div className="pt-4 border-t">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              {eventTypes.find(t => t.value === formData.eventType)?.label} Details
            </h3>
            {renderEventTypeFields()}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!formData.title || !formData.description || !formData.date || !formData.location || !formData.eventType}
          >
            {isEditing ? 'Update Event' : 'Save Event'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewEventForm;
