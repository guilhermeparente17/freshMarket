import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  type: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, token: string | null) => void;
  logout: () => void;
  register: (user: User, oken: string | null) => void;
  token: string | null;
  authenticated: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: (user, token) => {
    if (!token) return;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({ user: null, token: null, isAuthenticated: false });
  },

  register: (user, token) => set({ user, token, isAuthenticated: true }),
  authenticated: (token: string) => set({ token, isAuthenticated: true }),
}));
