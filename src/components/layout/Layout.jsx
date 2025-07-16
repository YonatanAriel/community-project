import AppRoutes from '@/routes/Routes';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="flex-1 w-full min-w-0 overflow-auto">
        <AppRoutes />
      </main>
    </div>
  );
}
export default Layout;
