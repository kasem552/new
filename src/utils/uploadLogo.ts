import { uploadImage } from '../lib/firebase/storage';

export async function uploadLogo(localPath: string) {
  try {
    // Fetch the local image
    const response = await fetch(localPath);
    const blob = await response.blob();
    
    // Create a File object from the blob
    const file = new File([blob], 'canaan-logo.png', { type: 'image/png' });
    
    // Upload to Firebase Storage
    const downloadUrl = await uploadImage(file, 'images/h7SMq4xV7G91v4LxVFHS');
    
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading logo:', error);
    throw error;
  }
}