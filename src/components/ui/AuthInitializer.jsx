import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';

function AuthInitializer({ children }) {
  const { logout, setAuth } = useUserStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setAuth(storedToken, parsedUser);
        } else if (storedToken && !storedUser) {
          logout();
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        logout();
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [logout, setAuth]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-2 rounded-full border-primary border-t-transparent animate-spin"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return children;
}

export default AuthInitializer;
