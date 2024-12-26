import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import { COLLECTIONS } from '../lib/firebase/collections';
import type { ApplicationData } from '../types/auth';

export interface Activity {
  id: string;
  type: 'signup' | 'login' | 'update';
  user: {
    id: string;
    name: string;
    email: string;
  };
  timestamp: string;
  data?: ApplicationData;
}

export function useRecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const q = query(
          collection(db, COLLECTIONS.APPLICATIONS),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        
        const querySnapshot = await getDocs(q);
        const recentActivities: Activity[] = querySnapshot.docs.map(doc => {
          const data = doc.data() as ApplicationData;
          return {
            id: doc.id,
            type: 'signup',
            user: {
              id: doc.id,
              name: data.fullName,
              email: data.email
            },
            timestamp: data.createdAt,
            data: data
          };
        });

        setActivities(recentActivities);
      } catch (error) {
        console.error('Error loading activities:', error);
      }
    };

    loadActivities();
    const interval = setInterval(loadActivities, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return activities;
}