import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  setUser: (user) => set({ user }),
}));
