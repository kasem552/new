import { useState } from 'react';
import { uploadImage, deleteImage, listImages } from '../lib/firebase/storage';

export function useStorage() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File, path?: string) => {
    try {
      setUploading(true);
      setError(null);
      return await uploadImage(file, path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const remove = async (url: string) => {
    try {
      setError(null);
      await deleteImage(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete file');
      throw err;
    }
  };

  const list = async (path?: string) => {
    try {
      setError(null);
      return await listImages(path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to list files');
      throw err;
    }
  };

  return {
    upload,
    remove,
    list,
    uploading,
    error
  };
}