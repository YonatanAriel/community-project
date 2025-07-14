import MembersTable from '../ui/MembersTable';
import { membersMockData } from '../../data/mockData';

function AdminDashboard() {
  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Manage community members and their profiles
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-4 text-xl font-semibold">Members Directory</h2>
          <MembersTable members={membersMockData} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
