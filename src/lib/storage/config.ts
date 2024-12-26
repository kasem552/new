import { storage as firebaseStorage } from '../firebase/storage/config';
import { supabase } from '../supabase/config';

export const STORAGE_CONFIG = {
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  TIMEOUT: 30000,
  BUCKETS: {
    IMAGES: 'images',
    TEAM: 'team-photos',
    LOGOS: 'members'
  }
};

export { firebaseStorage, supabase };