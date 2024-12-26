import { collection, addDoc, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../config';
import { COLLECTIONS } from '../constants';

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  tiktokHandle?: string;
  createdAt: string;
  viewed: boolean;
}

const messagesCollection = collection(db, COLLECTIONS.MESSAGES);

export async function getMessages() {
  try {
    const q = query(messagesCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
    })) as Message[];
  } catch (error) {
    console.error('Error getting messages:', error);
    throw error;
  }
}

export async function createMessage(data: Omit<Message, 'id' | 'createdAt' | 'viewed'>) {
  try {
    const docRef = await addDoc(messagesCollection, {
      ...data,
      viewed: false,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id };
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
}

export async function markMessageAsViewed(id: string) {
  try {
    const messageRef = doc(messagesCollection, id);
    await updateDoc(messageRef, {
      viewed: true
    });
    return { success: true };
  } catch (error) {
    console.error('Error marking message as viewed:', error);
    throw error;
  }
}

export async function deleteMessage(id: string) {
  try {
    await deleteDoc(doc(messagesCollection, id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
}