import { Users } from 'lucide-react';
import ConnectionCard from '@/components/ui/ConnectionCard';

function ConnectionsList({ connections, onRemove }) {
  if (!connections || !Array.isArray(connections) || connections.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <Users size={48} className="mx-auto mb-2 opacity-50" />
        <p>No connections yet</p>
      </div>
    );
  }

  return (
    <div className=" space-y-3 w-full lg:min-w-[70vw]">
      {connections.map((connection) => (
        <ConnectionCard
          key={connection?.id || Math.random()}
          connection={connection}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

export default ConnectionsList;
