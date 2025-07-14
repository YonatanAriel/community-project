import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { formatTimeAgo, truncateText } from '@/utils/function';
import UserAvatar from '@/components/ui/UserAvatar';
import ActionButtons from '@/components/ui/ActionButtons';
import StatusBadge from '@/components/ui/StatusBadge';

function ConnectionRequestCard({ request, onAccept, onReject }) {
  const { from_user, reason, requested_at, status } = request;

  return (
    <div className="p-4 border rounded-lg bg-card border-border w-full">
      <div className="flex items-start gap-4">
        <UserAvatar user={from_user} size="md" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">
              {from_user.user_name}
            </h4>
            <Badge variant="secondary" className="text-xs">
              <Clock size={12} className="mr-1" />
              {formatTimeAgo(requested_at)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {truncateText(reason, 120)}
          </p>
          {status === 'pending' && (
            <ActionButtons
              onAccept={onAccept}
              onReject={onReject}
              requestId={request.id}
            />
          )}
          {status !== 'pending' && <StatusBadge status={status} />}
        </div>
      </div>
    </div>
  );
}

export default ConnectionRequestCard;
