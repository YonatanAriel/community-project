import { Clock } from 'lucide-react';
import ConnectionRequestCard from '@/components/ui/ConnectionRequestCard';

function ConnectionRequestsList({ requests, onAccept, onReject }) {
  if (requests.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <Clock size={48} className="mx-auto mb-2 opacity-50" />
        <p>No pending requests</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 w-full lg:min-w-[70vw] ">
      {requests.map((request) => (
        <ConnectionRequestCard
          key={request.id}
          request={request}
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  );
}

export default ConnectionRequestsList;
