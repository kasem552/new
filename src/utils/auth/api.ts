import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase/config';
import { COLLECTIONS } from '../../lib/firebase/constants';
import { AuthResponse, LoginCredentials } from './types';
import { AUTH_CONFIG } from './constants';

export async function loginAdmin({ email, password }: LoginCredentials): Promise<AuthResponse> {
  try {
    // Query Firestore for admin with matching email
    const adminsRef = collection(db, COLLECTIONS.ADMINS);
    const q = query(adminsRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const adminDoc = querySnapshot.docs[0];
      const adminData = adminDoc.data();

      // Verify password
      if (adminData.password === password) {
        // Create mock token (in production, use proper JWT)
        const token = AUTH_CONFIG.MOCK_TOKEN;
        const user = {
          id: adminDoc.id,
          email: adminData.email,
          fullName: adminData.fullName || email,
          role: 'admin',
          createdAt: adminData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          updatedAt: adminData.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString()
        };
        
        return { token, user };
      }
    }
    
    throw new Error('Invalid email or password');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}