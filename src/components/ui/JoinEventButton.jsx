import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

function JoinEventButton({ eventId, onJoinEvent }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onJoinEvent?.(eventId)}
      className="flex items-center gap-1 text-green-600 hover:text-green-700"
    >
      <UserPlus className="w-4 h-4" />
      Join Event
    </Button>
  );
}

export default JoinEventButton;
