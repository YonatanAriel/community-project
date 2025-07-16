import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserMinus, Mail, Calendar } from 'lucide-react';
import { formatTimeAgo } from '@/utils/utils';

function ConnectionCard({ connection, onRemove }) {
  if (!connection) {
    return null;
  }

  const { user, connected_at, status } = connection;

  if (!user) {
    return (
      <div className="w-full p-4 border rounded-lg bg-card border-border">
        <div className="text-sm text-muted-foreground">
          Error: Invalid connection data
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 border rounded-lg bg-card border-border">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">
              {user?.user_name || 'Unknown User'}
            </h4>
            <Badge variant="default" className="text-xs">
              <Calendar size={12} className="mr-1" />
              {formatTimeAgo(connected_at)}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Mail size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {user?.email || 'No email provided'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {status === 'accepted' ? 'Connected' : status || 'Unknown'}
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onRemove(connection.id)}
              className="flex items-center gap-1 text-destructive hover:text-destructive"
              disabled={!connection.id || typeof onRemove !== 'function'}
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
