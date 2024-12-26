import { jwtDecode } from "jwt-decode";

export function validateToken(token: string): boolean {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return !!decoded && typeof decoded === 'object' && 'exp' in decoded && decoded.exp! > currentTime;
  } catch {
    return false;
  }
}

export function validateAdminRole(role?: string): boolean {
  return role === 'admin';
}