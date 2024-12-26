import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { storage } from '../config';
import { STORAGE_PATHS } from '../constants';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function retry<T>(operation: () => Promise<T>, attempts = MAX_RETRIES): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (attempts <= 1) throw error;
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    return retry(operation, attempts - 1);
  }
}

export async function uploadImage(file: File, path: string = STORAGE_PATHS.USER_UPLOADS): Promise<string> {
  try {
    const filename = `${Date.now()}-${file.name}`;
    const fullPath = `${path}/${filename}`;
    const storageRef = ref(storage, fullPath);
    
    const snapshot = await retry(() => 
      uploadBytes(storageRef, file, {
        customMetadata: { uploadTime: new Date().toISOString() }
      })
    );

    return await retry(() => getDownloadURL(snapshot.ref));
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function getImageUrl(path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    return await retry(() => getDownloadURL(storageRef));
  } catch (error) {
    console.error('Error getting image URL:', error);
    throw error;
  }
}

export async function deleteImage(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path);
    await retry(() => deleteObject(storageRef));
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

export async function listImages(path: string = STORAGE_PATHS.USER_UPLOADS): Promise<string[]> {
  try {
    const storageRef = ref(storage, path);
    const result = await retry(() => listAll(storageRef));
    return await Promise.all(result.items.map(item => retry(() => getDownloadURL(item))));
  } catch (error) {
    console.error('Error listing images:', error);
    throw error;
  }
}