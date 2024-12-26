import { 
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  StorageReference
} from 'firebase/storage';
import { storage } from './config';

export async function uploadImage(file: File, path: string = 'images'): Promise<string> {
  try {
    // Create a unique filename unless it's the logo
    const filename = path.includes('h7SMq4xV7G91v4LxVFHS') ? 'logo' : `${Date.now()}-${file.name}`;
    const fullPath = `${path}/${filename}`;
    
    // Create storage reference
    const storageRef = ref(storage, fullPath);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function deleteImage(url: string): Promise<void> {
  try {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

export async function listImages(path: string = 'images'): Promise<string[]> {
  try {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);
    
    // Get download URLs for all items
    const urls = await Promise.all(
      result.items.map(item => getDownloadURL(item))
    );
    
    return urls;
  } catch (error) {
    console.error('Error listing images:', error);
    throw error;
  }
}

export async function getImageURL(path: string): Promise<string> {
  try {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error getting image URL:', error);
    throw error;
  }
}

export function getStorageRef(path: string): StorageReference {
  return ref(storage, path);
}