import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string | null) => void;
  logout: () => void;
  register: (user: User, oken: string | null) => void;
  token: string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,

  login: (user, token) => set({ user, token, isAuthenticated: true }),

  logout: () => set({ user: null, token: null, isAuthenticated: false }),

  register: (user, token) => set({ user, token, isAuthenticated: true }),
}));
