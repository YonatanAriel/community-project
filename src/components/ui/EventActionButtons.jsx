import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function EventActionButtons({ eventId, onEdit, onDelete }) {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onEdit?.(eventId)}
        className="flex items-center gap-1"
      >
        <Edit2 className="w-4 h-4" />
        Edit
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDelete?.(eventId)}
        className="flex items-center gap-1 text-red-600 hover:text-red-700"
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </Button>
    </>
  );
}

export default EventActionButtons;
