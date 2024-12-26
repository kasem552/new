import React, { useState } from 'react';
import { Users, FileText } from 'lucide-react';
import { useApplications } from '../../hooks/useApplications';
import { formatRelativeTime } from '../../utils/date';
import MemberDetailsPanel from '../../components/admin/MemberDetailsPanel';
import type { ApplicationData } from '../../types/auth';
import { useThemeStore } from '../../store/theme';

export default function Dashboard() {
  const { accepted, pending } = useApplications();
  const [selectedMember, setSelectedMember] = useState<(ApplicationData & { id: string }) | null>(null);
  const { theme } = useThemeStore();

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handleViewMember = (member: ApplicationData & { id: string }) => {
    setSelectedMember(member);
  };

  const statCards = [
    {
      label: 'Total Users',
      value: formatNumber(accepted.length),
      icon: Users,
      trend: `+${accepted.length > 0 ? ((accepted.length / Math.max(accepted.length - 1, 1)) * 100 - 100).toFixed(0) : 0}%`,
      trendUp: true,
    },
    {
      label: 'New Applications',
      value: formatNumber(pending.length),
      icon: FileText,
      trend: `+${pending.length}`,
      trendUp: true,
    }
  ];

  return (
    <div className={`space-y-8 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
      <div className="flex justify-between items-center p-8">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <div className="text-sm opacity-70">Last updated: {new Date().toLocaleString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`${
              theme === 'light'
                ? 'bg-gray-100 border-gray-200'
                : 'bg-white/10 border-white/20'
            } backdrop-blur-sm border rounded-xl p-6 hover:border-accent/50 transition-all duration-300`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="opacity-70">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <stat.icon className="text-accent" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                {stat.trend}
              </span>
              <span className="text-sm opacity-70 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className={`${
        theme === 'light'
          ? 'bg-gray-100 border-gray-200'
          : 'bg-white/10 border-white/20'
        } backdrop-blur-sm border rounded-xl mx-8`}>
        <h3 className="text-xl font-bold p-6 border-b border-white/10">Recent Activity</h3>
        <div className="p-6">
          {pending.length > 0 ? (
            <div className="space-y-4">
              {pending.slice(0, 5).map((application) => (
                <div
                  key={application.id}
                  className={`flex items-center justify-between py-3 border-b ${
                    theme === 'light' ? 'border-gray-200' : 'border-white/10'
                  } last:border-0`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="text-accent" size={20} />
                    </div>
                    <div>
                      <p className="font-medium">
                        New member: {application.fullName}
                      </p>
                      <p className="text-sm opacity-70">
                        {formatRelativeTime(application.createdAt)}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleViewMember(application)}
                    className="px-4 py-2 rounded-xl bg-accent/20 hover:bg-accent/30 transition-all duration-300"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 opacity-70">
              No recent activity
            </div>
          )}
        </div>
      </div>

      <MemberDetailsPanel 
        member={selectedMember} 
        onClose={() => setSelectedMember(null)} 
      />
    </div>
  );
}