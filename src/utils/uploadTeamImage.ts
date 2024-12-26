import { uploadImage } from '../lib/firebase/storage';

export async function uploadTeamImage(imageUrl: string, memberName: string) {
  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // Create a File object from the blob
    const file = new File([blob], `${memberName.toLowerCase().replace(/\s+/g, '-')}.jpg`, { type: 'image/jpeg' });
    
    // Upload to Firebase Storage in the team-photos directory
    const downloadUrl = await uploadImage(file, 'team-photos');
    
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading team image:', error);
    throw error;
  }
}