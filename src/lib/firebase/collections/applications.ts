import { collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../config';
import { COLLECTIONS } from '../constants';
import type { ApplicationData } from '../../../types/auth';

export const applicationsCollection = collection(db, COLLECTIONS.APPLICATIONS);

export async function createApplication(data: Omit<ApplicationData, 'createdAt' | 'updatedAt'>) {
  try {
    const applicationData = {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(applicationsCollection, applicationData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
}

export async function updateApplication(id: string, data: Partial<ApplicationData>) {
  try {
    const docRef = doc(applicationsCollection, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating application:', error);
    throw error;
  }
}

export async function deleteApplication(id: string) {
  try {
    const docRef = doc(applicationsCollection, id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
}

export async function getApplication(id: string) {
  try {
    const docRef = doc(applicationsCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } as ApplicationData };
    }
    return { success: false, error: 'Application not found' };
  } catch (error) {
    console.error('Error getting application:', error);
    throw error;
  }
}

export async function getApplicationsByStatus(status: 'pending' | 'accepted' | 'rejected') {
  try {
    const q = query(
      applicationsCollection,
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ApplicationData[];
  } catch (error) {
    console.error('Error getting applications by status:', error);
    throw error;
  }
}