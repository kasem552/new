import { getStorage } from 'firebase/storage';
import { app } from '../config';

// Initialize storage with custom retry settings
const storage = getStorage(app);

// Configure retry behavior
const RETRY_CONFIG = {
  maxOperationRetryTime: 30000, // 30 seconds
  maxUploadRetryTime: 30000 // 30 seconds
};

export { storage, RETRY_CONFIG };