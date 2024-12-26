export const COLLECTIONS = {
  APPLICATIONS: 'applications',
  ANALYTICS: 'analytics',
  USERS: 'users',
  ADMINS: 'admins',
  MESSAGES: 'messages'
} as const;

export const STORAGE_PATHS = {
  LOGOS: 'logos',
  TEAM_PHOTOS: 'team-photos',
  USER_UPLOADS: 'user-uploads'
} as const;

export const ERROR_CODES = {
  PERMISSION_DENIED: 'permission-denied',
  NOT_FOUND: 'not-found',
  ALREADY_EXISTS: 'already-exists',
  INVALID_ARGUMENT: 'invalid-argument'
} as const;