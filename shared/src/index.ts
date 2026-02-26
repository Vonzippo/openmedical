// Shared types between frontend and backend
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'practice';
  createdAt: Date;
}

export interface Practice {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
