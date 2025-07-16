import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';

function AuthInitializer({ children }) {
  const { token, user, logout } = useUserStore();

  useEffect(() => {
    if (token && !user) {
      console.log('Token exists but no user data, clearing authentication');
      logout();
    }
  }, [token, user, logout]);

  return children;
}

export default AuthInitializer;
