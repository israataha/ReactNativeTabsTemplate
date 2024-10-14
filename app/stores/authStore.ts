import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  signIn: (authToken: string) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  isAuthenticated: false,
  signIn: authToken => set({ token: authToken, isAuthenticated: true }),
  signOut: () => set({ token: null, isAuthenticated: false }),
}));
