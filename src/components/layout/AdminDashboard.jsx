import MembersTable from '../ui/MembersTable';
import { Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUsersFullData } from '../../services/apiCalls';
import { useUserStore } from '../../store/userStore';

function AdminDashboard() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setAllUsers } = useUserStore();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await getUsersFullData();
        setMembers(response);
        setAllUsers(response);
      } catch (error) {
        console.log(error);
        setError('Failed to load members');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [setAllUsers]);

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
            {loading ? (
              <div>Loading members...</div>
            ) : error ? (
              <>
                <div className="mb-2 text-red-500">{error}</div>
                <MembersTable members={members} />
              </>
            ) : (
              <MembersTable members={members} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
