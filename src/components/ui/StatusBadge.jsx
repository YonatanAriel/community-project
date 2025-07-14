import { Badge } from '@/components/ui/badge';
import { Check, X, Clock } from 'lucide-react';

function StatusBadge({ status }) {
  const statusConfig = {
    pending: {
      icon: Clock,
      variant: 'secondary',
      text: 'Pending',
    },
    accepted: {
      icon: Check,
      variant: 'default',
      text: 'Accepted',
    },
    rejected: {
      icon: X,
      variant: 'destructive',
      text: 'Rejected',
    },
    connected: {
      icon: Check,
      variant: 'default',
      text: 'Connected',
    },
  };

  const config = statusConfig[status];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="text-xs">
      <Icon size={12} className="mr-1" />
      {config.text}
    </Badge>
  );
}

export default StatusBadge;
