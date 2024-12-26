import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import { COLLECTIONS } from '../lib/firebase/collections';
import { formatTimestamp } from '../utils/date';
import type { ApplicationData } from '../types/auth';

interface ApplicationState {
  pending: (ApplicationData & { id: string })[];
  accepted: (ApplicationData & { id: string })[];
  rejected: (ApplicationData & { id: string })[];
  loading: boolean;
  error: string | null;
}

export function useApplications() {
  const [state, setState] = useState<ApplicationState>({
    pending: [],
    accepted: [],
    rejected: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const applicationsRef = collection(db, COLLECTIONS.APPLICATIONS);
    const q = query(applicationsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const applications = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: formatTimestamp(data.createdAt) || new Date().toISOString(),
            updatedAt: formatTimestamp(data.updatedAt) || new Date().toISOString()
          };
        }) as (ApplicationData & { id: string })[];

        setState({
          pending: applications.filter(app => !app.status || app.status === 'pending'),
          accepted: applications.filter(app => app.status === 'accepted'),
          rejected: applications.filter(app => app.status === 'rejected'),
          loading: false,
          error: null
        });
      },
      (error) => {
        console.error('Error fetching applications:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    );

    return () => unsubscribe();
  }, []);

  return state;
}