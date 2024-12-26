import { useState } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import { COLLECTIONS } from '../lib/firebase/collections';

export function useApplicationStatus() {
  const [updating, setUpdating] = useState<string | null>(null);

  const updateStatus = async (applicationId: string, status: 'accepted' | 'rejected') => {
    try {
      setUpdating(applicationId);
      const docRef = doc(db, COLLECTIONS.APPLICATIONS, applicationId);
      
      await updateDoc(docRef, {
        status,
        updatedAt: serverTimestamp()
      });

      return true;
    } catch (error) {
      console.error(`Error updating application status:`, error);
      throw error;
    } finally {
      setUpdating(null);
    }
  };

  return {
    updating,
    updateStatus
  };
}