import AppRoutes from '@/routes/Routes';
import Sidebar from './Sidebar';
import AuthInitializer from '@/components/ui/AuthInitializer';
import { useUserStore } from '@/store/userStore';

function Layout() {
  const { isAuthenticated } = useUserStore();

  return (
    <AuthInitializer>
      <div className="flex w-full h-screen">
        {isAuthenticated && <Sidebar />}
        <main
          className={`flex-1 w-full min-w-0 overflow-auto ${isAuthenticated ? '' : 'w-full'}`}
        >
          <AppRoutes />
        </main>
      </div>
    </AuthInitializer>
  );
}

export default Layout;
