import { formatTimeAgo } from '@/utils/function';
import UserAvatar from '@/components/ui/UserAvatar';
import StatusBadge from '@/components/ui/StatusBadge';

function ConnectionsHistory({ requests }) {
  return (
    <div className="space-y-4 w-full  lg:min-w-[70vw] ">
      <h3 className="text-lg font-semibold text-foreground">
        All Connection Requests
      </h3>

      {requests.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground">
          <p>No connection requests found</p>
        </div>
      ) : (
        <div className="w-full space-y-3">
          {requests.map((request) => (
            <div
              key={request.id}
              className="w-full p-4 border rounded-lg bg-card border-border"
            >
              <div className="flex items-start gap-4">
                <UserAvatar user={request.from_user} size="sm" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-foreground">
                        {request.from_user.user_name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        to {request.to_user.user_name}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={request.status} />
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(request.requested_at)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {request.reason}
                  </p>
                  {request.responded_at && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Responded {formatTimeAgo(request.responded_at)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ConnectionsHistory;
