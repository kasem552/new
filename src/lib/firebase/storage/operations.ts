import { 
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  StorageReference
} from 'firebase/storage';
import { storage, RETRY_CONFIG } from './config';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function retryOperation<T>(
  operation: () => Promise<T>, 
  retries: number = MAX_RETRIES
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries <= 1) throw error;
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    return retryOperation(operation, retries - 1);
  }
}

export async function uploadImage(file: File, path: string = 'images'): Promise<string> {
  try {
    // Create a unique filename unless it's a logo
    const filename = path.includes('logo') ? 'logo' : `${Date.now()}-${file.name}`;
    const fullPath = `${path}/${filename}`;
    const storageRef = ref(storage, fullPath);
    
    // Upload with retry
    const snapshot = await retryOperation(() => 
      uploadBytes(storageRef, file, {
        customMetadata: {
          uploadTime: new Date().toISOString()
        }
      })
    );

    // Get URL with retry
    return await retryOperation(() => getDownloadURL(snapshot.ref));
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function getImageURL(path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    return await retryOperation(() => getDownloadURL(storageRef));
  } catch (error) {
    console.error('Error getting image URL:', error);
    throw error;
  }
}

export async function deleteImage(path: string): Promise<void> {
  try {
    const storageRef = ref(storage, path);
    await retryOperation(() => deleteObject(storageRef));
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

export async function listImages(path: string = 'images'): Promise<string[]> {
  try {
    const storageRef = ref(storage, path);
    const result = await retryOperation(() => listAll(storageRef));
    
    // Get all download URLs with retry
    const urls = await Promise.all(
      result.items.map(item => retryOperation(() => getDownloadURL(item)))
    );
    
    return urls;
  } catch (error) {
    console.error('Error listing images:', error);
    throw error;
  }
}

export function getStorageRef(path: string): StorageReference {
  return ref(storage, path);
}