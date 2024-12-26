import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseStorage, STORAGE_CONFIG } from './config';
import { uploadFile as uploadToSupabase, getPublicUrl } from '../supabase/storage';
import { supabase } from '../supabase/config';

async function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function withRetry<T>(
  operation: () => Promise<T>,
  attempts: number = STORAGE_CONFIG.RETRY_ATTEMPTS
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (attempts <= 1) throw error;
    await wait(STORAGE_CONFIG.RETRY_DELAY);
    return withRetry(operation, attempts - 1);
  }
}

export async function uploadImage(file: File, path: string): Promise<string> {
  try {
    // Try Firebase first
    const filename = `${Date.now()}-${file.name}`;
    const fullPath = `${path}/${filename}`;
    
    try {
      const storageRef = ref(firebaseStorage, fullPath);
      const snapshot = await withRetry(() => 
        uploadBytes(storageRef, file, {
          customMetadata: { uploadTime: new Date().toISOString() }
        })
      );
      return await withRetry(() => getDownloadURL(snapshot.ref));
    } catch (firebaseError) {
      console.warn('Firebase upload failed:', firebaseError);
      
      // Try Supabase if available
      if (supabase) {
        console.log('Falling back to Supabase...');
        const { data } = await withRetry(() => 
          uploadToSupabase(file, STORAGE_CONFIG.BUCKETS.IMAGES, fullPath)
        );
        
        if (!data?.path) throw new Error('Supabase upload failed');
        return await getPublicUrl(STORAGE_CONFIG.BUCKETS.IMAGES, data.path);
      }
      
      throw firebaseError;
    }
  } catch (error) {
    console.error('All storage upload attempts failed:', error);
    throw error;
  }
}

export async function getImageUrl(path: string): Promise<string> {
  try {
    // Try Firebase first
    try {
      const storageRef = ref(firebaseStorage, path);
      return await withRetry(() => getDownloadURL(storageRef));
    } catch (firebaseError) {
      console.warn('Firebase getURL failed:', firebaseError);
      
      // Try Supabase if available
      if (supabase) {
        console.log('Falling back to Supabase...');
        return await getPublicUrl(STORAGE_CONFIG.BUCKETS.IMAGES, path);
      }
      
      throw firebaseError;
    }
  } catch (error) {
    console.error('All storage getURL attempts failed:', error);
    throw error;
  }
}