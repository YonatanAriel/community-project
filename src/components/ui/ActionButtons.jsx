import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

function ActionButtons({ onAccept, onReject, requestId, loading = false }) {
  if (
    !requestId ||
    typeof onAccept !== 'function' ||
    typeof onReject !== 'function'
  ) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        onClick={() => onAccept(requestId)}
        disabled={loading}
        className="flex items-center gap-1"
      >
        <Check size={14} />
        Accept
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => onReject(requestId)}
        disabled={loading}
        className="flex items-center gap-1"
      >
        <X size={14} />
        Reject
      </Button>
    </div>
  );
}

export default ActionButtons;
