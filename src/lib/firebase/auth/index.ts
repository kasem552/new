import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config';
import { createUser } from '../collections/users';
import type { AuthResponse } from '../../../types/auth';

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return {
      token: await result.user.getIdToken(),
      user: {
        id: result.user.uid,
        email: result.user.email!,
        fullName: result.user.displayName || '',
        role: 'user',
        createdAt: result.user.metadata.creationTime || new Date().toISOString(),
        updatedAt: result.user.metadata.lastSignInTime || new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

export async function signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document in Firestore
    await createUser(result.user.uid, {
      email,
      fullName,
      role: 'user'
    });

    return {
      token: await result.user.getIdToken(),
      user: {
        id: result.user.uid,
        email: result.user.email!,
        fullName,
        role: 'user',
        createdAt: result.user.metadata.creationTime || new Date().toISOString(),
        updatedAt: result.user.metadata.lastSignInTime || new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}