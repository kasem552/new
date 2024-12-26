import { doc, getDoc, setDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../config';
import { COLLECTIONS } from '../constants';

const analyticsRef = doc(db, COLLECTIONS.ANALYTICS, 'stats');

export async function incrementAnalyticsStat(field: string, value: number = 1) {
  try {
    await setDoc(analyticsRef, {
      [field]: increment(value),
      lastUpdated: serverTimestamp()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error incrementing analytics:', error);
    throw error;
  }
}

export async function getAnalyticsStats() {
  try {
    const docSnap = await getDoc(analyticsRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    }
    return { success: false, error: 'Analytics not found' };
  } catch (error) {
    console.error('Error getting analytics:', error);
    throw error;
  }
}

export async function updateAnalyticsStats(stats: Record<string, any>) {
  try {
    await setDoc(analyticsRef, {
      ...stats,
      lastUpdated: serverTimestamp()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error('Error updating analytics:', error);
    throw error;
  }
}