import { create } from 'zustand';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  signIn: (authToken: string) => void;
  signOut: () => void;
  signUp: (authToken: string) => void;
}

export const useAuth = create<AuthState>(set => ({
  token: null,
  isAuthenticated: false,
  signIn: authToken => set({ token: authToken, isAuthenticated: true }),
  signOut: () => set({ token: null, isAuthenticated: false }),
  signUp: authToken => set({ token: authToken, isAuthenticated: true }),
}));
