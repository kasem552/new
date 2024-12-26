import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import { COLLECTIONS } from '../lib/firebase/collections';

interface AdminAccess {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
}

export function useAdminAccess() {
  const [admins, setAdmins] = useState<AdminAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const adminsRef = collection(db, COLLECTIONS.ADMINS);
    const q = query(adminsRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const adminList = snapshot.docs.map(doc => ({
          id: doc.id,
          email: doc.data().email,
          password: doc.data().password,
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
        setAdmins(adminList);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching admins:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { admins, loading, error };
}