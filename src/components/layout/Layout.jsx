import MainContext from '@/context/MainContext';
import AppRoutes from '@/routes/Routes';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <MainContext>
      <div className="flex h-screen w-full">
        <Sidebar />
        <main className="flex-1 w-full min-w-0 overflow-auto">
          <AppRoutes />
        </main>
      </div>
    </MainContext>
  );
}
export default Layout;
