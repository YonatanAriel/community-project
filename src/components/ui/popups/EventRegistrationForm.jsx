import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

function EventRegistrationForm({ event, onRegister, onCancel }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName.trim() || !formData.email.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Call onRegister with the form data and event info
    onRegister({
      eventId: event.id,
      eventTitle: event.title,
      fullName: formData.fullName,
      email: formData.email,
      registrationDate: new Date().toISOString()
    });
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
        <h2 className="text-2xl font-bold text-foreground">Register for Event</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="p-2"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {event.title}
        </h3>
        <p className="mb-2 text-muted-foreground">
          {event.description}
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>📅 {event.date}</span>
          <span>🕐 {event.time}</span>
          <span>📍 {event.location}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-foreground">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-foreground">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your email address"
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
            className="bg-green-600 hover:bg-green-700"
          >
            Register for Event
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EventRegistrationForm;
