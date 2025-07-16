import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

function NewEventForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    externalUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Create New Event</h2>
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
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Maximum Attendees
          </label>
          <input
            type="number"
            name="maxAttendees"
            value={formData.maxAttendees}
            onChange={handleChange}
            min="1"
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            External URL (Optional)
          </label>
          <input
            type="url"
            name="externalUrl"
            value={formData.externalUrl}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

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
          >
            Save Event
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewEventForm;
