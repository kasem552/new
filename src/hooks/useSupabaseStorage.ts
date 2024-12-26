import { useState } from 'react';
import { uploadFile, getPublicUrl, deleteFile, listFiles } from '../lib/supabase/storage';

export function useSupabaseStorage() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File, bucket: string, path: string) => {
    try {
      setUploading(true);
      setError(null);
      const data = await uploadFile(file, bucket, path);
      const url = await getPublicUrl(bucket, data.path);
      return url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const remove = async (bucket: string, path: string) => {
    try {
      setError(null);
      return await deleteFile(bucket, path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete file');
      throw err;
    }
  };

  const list = async (bucket: string, path?: string) => {
    try {
      setError(null);
      return await listFiles(bucket, path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to list files');
      throw err;
    }
  };

  const getUrl = async (bucket: string, path: string) => {
    try {
      setError(null);
      return await getPublicUrl(bucket, path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get URL');
      throw err;
    }
  };

  return {
    upload,
    remove,
    list,
    getUrl,
    uploading,
    error
  };
}