import { jwtDecode } from "jwt-decode";

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export async function loginAdmin(email: string, password: string): Promise<AuthResponse> {
  // This would be replaced with an actual API call in production
  if (email === 'admin@example.com' && password === 'admin123') {
    const token = 'mock-jwt-token';
    const user: User = {
      id: '1',
      email: email,
      role: 'admin'
    };
    return { token, user };
  }
  throw new Error('Invalid credentials');
}

export function validateToken(token: string): boolean {
  try {
    const decoded = jwtDecode(token);
    return !!decoded;
  } catch {
    return false;
  }
}