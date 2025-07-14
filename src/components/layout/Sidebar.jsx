import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SIDEBAR_LABELS, NAVIGATION_ITEMS } from '@/constants/constants';
import { useUserStore } from '@/store/userStore';
import { User, LogOut } from 'lucide-react';

function Sidebar() {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col w-64 h-screen border-r bg-card">
      <div className="flex flex-col gap-2 p-4">
        <h2 className="text-lg font-semibold">Community</h2>
        <nav className="flex flex-col gap-1">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-accent hover:text-accent-foreground"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
            <User size={16} />
          </div>
          <div className="flex-1 text-sm">
            <div className="font-medium">{user.name}</div>
            <div className="text-muted-foreground">{user.email}</div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="justify-start w-full gap-2 mt-2"
          onClick={() => {
            // Placeholder for logout functionality
            console.log('Logout clicked');
          }}
        >
          <LogOut size={16} />
          {SIDEBAR_LABELS.LOGOUT}
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
