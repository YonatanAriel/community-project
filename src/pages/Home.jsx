import AdminDashboard from '@/components/layout/AdminDashboard';
import { useUserStore } from '@/store/userStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.is_admin) {
      navigate('/userprofile', { replace: true });
    }
  }, [user, navigate]);

  if (user?.is_admin) {
    return <AdminDashboard />;
  }
  return null;
}

export default Home;
