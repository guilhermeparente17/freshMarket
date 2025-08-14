export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
}