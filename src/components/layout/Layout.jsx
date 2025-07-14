import MainContext from '@/context/MainContext';
import AppRoutes from '@/routes/Routes';
import Sidebar from './Sidebar';

function Layout() {
  return (
    <MainContext>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <AppRoutes />
        </main>
      </div>
    </MainContext>
  );
}
export default Layout;
