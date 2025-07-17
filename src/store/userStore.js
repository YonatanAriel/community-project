import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  isAdmin: false,
  allUsers: [],

  setAuth: (token, user) => {
    localStorage.setItem('token', token);
    set({
      token,
      user,
      isAuthenticated: true,
      isAdmin: user?.is_admin || false,
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    });
  },

  setUser: (user) => set({ user }),

  setAllUsers: (users) => set({ allUsers: users }),
}));
