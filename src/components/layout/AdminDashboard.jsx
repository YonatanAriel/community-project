import MembersTable from '../ui/MembersTable';
import { membersMockData } from '../../data/mockData';
import { Home } from 'lucide-react';

function AdminDashboard() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 w-full px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Home size={32} className="text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            Manage community members and their profiles
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <MembersTable members={membersMockData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
