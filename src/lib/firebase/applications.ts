import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';
import { COLLECTIONS } from './collections';
import type { SignUpForm } from '../../types/auth';

export async function submitApplication(formData: SignUpForm) {
  try {
    const applicationData = {
      ...formData,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, COLLECTIONS.APPLICATIONS), applicationData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
}

export async function updateApplicationStatus(
  applicationId: string, 
  status: 'accepted' | 'rejected'
) {
  try {
    const docRef = doc(db, COLLECTIONS.APPLICATIONS, applicationId);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
}