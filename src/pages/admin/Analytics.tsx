import React, { useState } from 'react';
import { TrendingUp, UserCheck, UserX } from 'lucide-react';
import { useApplications } from '../../hooks/useApplications';
import StatsCard from '../../components/analytics/StatsCard';
import DateRangeSelector from '../../components/analytics/DateRangeSelector';

export default function Analytics() {
  const { accepted, rejected } = useApplications();
  const [dateRange, setDateRange] = useState<'24h' | '7d' | '30d' | 'all'>('7d');

  const stats = [
    {
      title: 'Accepted Applications',
      value: accepted.length,
      icon: UserCheck,
      trend: `+${accepted.length}`,
      description: 'Successfully onboarded'
    },
    {
      title: 'Rejected Applications',
      value: rejected.length,
      icon: UserX,
      trend: `+${rejected.length}`,
      description: 'Not qualified'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
        <DateRangeSelector value={dateRange} onChange={setDateRange} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}