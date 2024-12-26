import { useState } from 'react';
import { uploadImage, getImageUrl } from '../lib/storage/operations';

export function useUnifiedStorage() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File, path: string) => {
    try {
      setUploading(true);
      setError(null);
      return await uploadImage(file, path);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      throw new Error(message);
    } finally {
      setUploading(false);
    }
  };

  const getUrl = async (path: string) => {
    try {
      setError(null);
      return await getImageUrl(path);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get URL';
      setError(message);
      throw new Error(message);
    }
  };

  return {
    upload,
    getUrl,
    uploading,
    error
  };
}