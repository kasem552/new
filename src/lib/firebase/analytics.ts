import { doc, setDoc, increment, serverTimestamp, deleteDoc, collection } from 'firebase/firestore';
import { db } from './config';
import { COLLECTIONS } from './collections';

const ANALYTICS_DOC = 'stats';
const VISITORS_COLLECTION = 'activeVisitors';

export async function trackVisitor() {
  try {
    // Create a visitor document with auto-generated ID
    const visitorRef = await setDoc(doc(collection(db, VISITORS_COLLECTION)), {
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent
    });

    // Update total visitors count
    const analyticsRef = doc(db, COLLECTIONS.ANALYTICS, ANALYTICS_DOC);
    await setDoc(analyticsRef, {
      activeVisitors: increment(1),
      lastUpdated: serverTimestamp()
    }, { merge: true });

    // Return cleanup function
    return async () => {
      try {
        await deleteDoc(visitorRef);
        await setDoc(analyticsRef, {
          activeVisitors: increment(-1),
          lastUpdated: serverTimestamp()
        }, { merge: true });
      } catch (error) {
        console.error('Error cleaning up visitor tracking:', error);
      }
    };
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return undefined;
  }
}

export async function incrementTotalUsers() {
  try {
    const analyticsRef = doc(db, COLLECTIONS.ANALYTICS, ANALYTICS_DOC);
    await setDoc(analyticsRef, {
      totalUsers: increment(1),
      lastUpdated: serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.error('Error incrementing total users:', error);
  }
}