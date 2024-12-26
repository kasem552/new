import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase/config';
import { COLLECTIONS } from '../lib/firebase/collections';

interface AnalyticsData {
  timestamp: Timestamp;
  type: string;
  value: number;
}

interface AnalyticsState {
  data: AnalyticsData[];
  loading: boolean;
  error: string | null;
}

export function useAnalytics(timeRange: '24h' | '7d' | '30d' | 'all') {
  const [state, setState] = useState<AnalyticsState>({
    data: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        
        let startTime: Date;
        const now = new Date();

        switch (timeRange) {
          case '24h':
            startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            break;
          case '7d':
            startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case '30d':
            startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
          default:
            startTime = new Date(0); // Beginning of time for 'all'
        }

        const analyticsRef = collection(db, COLLECTIONS.ANALYTICS);
        const q = query(
          analyticsRef,
          where('timestamp', '>=', Timestamp.fromDate(startTime))
        );

        const snapshot = await getDocs(q);
        const analyticsData = snapshot.docs.map(doc => ({
          ...doc.data(),
          timestamp: doc.data().timestamp as Timestamp
        })) as AnalyticsData[];

        // Sort data by timestamp
        analyticsData.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);

        setState({
          data: analyticsData,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch analytics'
        }));
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  return state;
}