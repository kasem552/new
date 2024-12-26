import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import { COLLECTIONS } from '../lib/firebase/collections';
import type { SignUpForm, ApplicationData } from '../types/auth';

interface SignupResponse {
  success: boolean;
  user?: ApplicationData & { id: string };
  error?: string;
}

export async function submitSignup(formData: SignUpForm): Promise<SignupResponse> {
  try {
    const applicationData = {
      ...formData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, COLLECTIONS.APPLICATIONS), applicationData);
    
    return {
      success: true,
      user: {
        id: docRef.id,
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Error submitting signup:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit application'
    };
  }
}