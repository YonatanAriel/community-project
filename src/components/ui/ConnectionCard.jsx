import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserMinus, Mail, Calendar } from 'lucide-react';
import { formatTimeAgo } from '@/utils/function';
import UserAvatar from '@/components/ui/UserAvatar';

function ConnectionCard({ connection, onRemove }) {
  const { user, connected_at, status } = connection;

  return (
    <div className="p-4 border rounded-lg bg-card border-border w-full">
      <div className="flex items-start gap-4">
        <UserAvatar user={user} size="md" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">{user.user_name}</h4>
            <Badge variant="default" className="text-xs">
              <Calendar size={12} className="mr-1" />
              {formatTimeAgo(connected_at)}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Mail size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{user.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {status === 'connected' ? 'Connected' : status}
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRemove(connection.id)}
              className="flex items-center gap-1 text-destructive hover:text-destructive"
            >
              <UserMinus size={14} />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectionCard;
