import { collection, doc, setDoc, getDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../config';
import { COLLECTIONS } from '../constants';
import type { User } from '../../../types/auth';

export const usersCollection = collection(db, COLLECTIONS.USERS);

export async function createUser(userId: string, userData: Partial<User>) {
  try {
    const userRef = doc(usersCollection, userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getUser(userId: string) {
  try {
    const userRef = doc(usersCollection, userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } as User };
    }
    return { success: false, error: 'User not found' };
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  try {
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { success: true, data: { id: doc.id, ...doc.data() } as User };
    }
    return { success: false, error: 'User not found' };
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
}