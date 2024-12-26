import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import { COLLECTIONS } from '../lib/firebase/collections';
import { useApplications } from '../hooks/useApplications';

interface DashboardStats {
  totalUsers: number;
  pageViews: number;
  pendingApplications: number;
  trends: {
    users: string;
    views: string;
    applications: string;
  };
}

export function useDashboardStats() {
  const { accepted, pending } = useApplications();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    pageViews: 0,
    pendingApplications: 0,
    trends: {
      users: '+0%',
      views: '+0%',
      applications: '+0%',
    }
  });

  useEffect(() => {
    // Update stats whenever applications change
    const totalUsers = accepted.length;
    const pendingCount = pending.length;

    setStats({
      totalUsers,
      pageViews: totalUsers * 15, // Assume each user views ~15 pages
      pendingApplications: pendingCount,
      trends: {
        users: `+${totalUsers > 0 ? ((totalUsers / Math.max(totalUsers - 1, 1)) * 100 - 100).toFixed(0) : 0}%`,
        views: `+${totalUsers > 0 ? '8' : '0'}%`,
        applications: `+${pendingCount > 0 ? '24' : '0'}%`,
      }
    });
  }, [accepted, pending]);

  return stats;
}