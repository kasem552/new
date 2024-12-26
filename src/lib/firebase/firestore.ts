import { 
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';
import { COLLECTIONS } from './collections';

export async function updateDocument(
  collectionName: keyof typeof COLLECTIONS,
  documentId: string,
  data: Record<string, any>
) {
  try {
    const docRef = doc(db, COLLECTIONS[collectionName], documentId);
    
    // Get current document data
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Document does not exist');
    }

    // Prepare update data with timestamp
    const updateData = {
      ...data,
      updatedAt: serverTimestamp()
    };

    // Update document
    await updateDoc(docRef, updateData);
    
    return true;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

export async function addDocument(
  collectionName: keyof typeof COLLECTIONS,
  data: Record<string, any>
) {
  try {
    const colRef = collection(db, COLLECTIONS[collectionName]);
    
    // Add timestamps
    const docData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(colRef, docData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding document:', error);
    throw error;
  }
}

export async function getDocuments(
  collectionName: keyof typeof COLLECTIONS,
  constraints: QueryConstraint[] = []
) {
  try {
    const colRef = collection(db, COLLECTIONS[collectionName]);
    const q = query(colRef, ...constraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
}

export async function getDocument(
  collectionName: keyof typeof COLLECTIONS,
  documentId: string
) {
  try {
    const docRef = doc(db, COLLECTIONS[collectionName], documentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
}

export async function deleteDocument(
  collectionName: keyof typeof COLLECTIONS,
  documentId: string
) {
  try {
    const docRef = doc(db, COLLECTIONS[collectionName], documentId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}