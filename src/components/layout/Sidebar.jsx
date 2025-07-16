import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SIDEBAR_LABELS, NAVIGATION_ITEMS } from '@/constants/constants';
import { useUserStore } from '@/store/userStore';
import { User, LogOut } from 'lucide-react';
import { cn } from '@/utils/utils';

function Sidebar() {
  const { user, logout } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  let visibleNavigationItems = NAVIGATION_ITEMS.filter((item) => {
    if (item.href === '/dashboard') {
      return user?.is_admin;
    }
    return true;
  });

  if (!user?.is_admin) {
    const profileItem = visibleNavigationItems.find(
      (item) => item.href === '/userprofile'
    );
    visibleNavigationItems = [
      profileItem,
      ...visibleNavigationItems.filter((item) => item.href !== '/userprofile'),
    ];
  }

  return (
    <div className="flex flex-col w-64 h-screen border-r bg-background border-border">
      <div className="px-6 py-8">
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          Community
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {visibleNavigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-3 text-sm font-medium transition-all duration-200 rounded-lg group',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon
                size={18}
                className={cn(
                  'transition-colors',
                  isActive
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground group-hover:text-accent-foreground'
                )}
              />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-border">
        <div className="flex items-center gap-3 p-3 mb-3 rounded-lg bg-muted/50">
          <div className="flex items-center justify-center rounded-full w-9 h-9 bg-primary text-primary-foreground">
            <User size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate text-foreground">
              {user?.full_name || user?.name || 'User'}
            </div>
            <div className="text-xs truncate text-muted-foreground">
              {user?.email || 'user@example.com'}
            </div>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="justify-start w-full gap-2 text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          {SIDEBAR_LABELS.LOGOUT}
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
