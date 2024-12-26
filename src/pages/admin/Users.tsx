import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Check, X, Clock, Loader2 } from 'lucide-react';
import MemberDetailsPanel from '../../components/admin/MemberDetailsPanel';
import { useApplications } from '../../hooks/useApplications';
import { useApplicationStatus } from '../../hooks/useApplicationStatus';
import type { ApplicationData } from '../../types/auth';

export default function Users() {
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  const [selectedMember, setSelectedMember] = useState<(ApplicationData & { id: string }) | null>(null);
  const { pending, accepted, rejected, loading, error } = useApplications();
  const { updating, updateStatus } = useApplicationStatus();

  const applications = {
    pending,
    accepted,
    rejected
  };

  const handleAccept = async (memberId: string) => {
    try {
      await updateStatus(memberId, 'accepted');
      setSelectedMember(null);
    } catch (error) {
      console.error('Error accepting application:', error);
    }
  };

  const handleReject = async (memberId: string) => {
    try {
      await updateStatus(memberId, 'rejected');
      setSelectedMember(null);
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'accepted': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'accepted': return <Check className="w-5 h-5 text-green-400" />;
      case 'rejected': return <X className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-yellow-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 p-8">
        Error loading applications: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Applications</h2>
      </div>

      <div className="flex space-x-4 border-b border-white/10">
        {[
          { id: 'pending', label: 'Pending Applications', count: applications.pending.length },
          { id: 'accepted', label: 'Accepted Applications', count: applications.accepted.length },
          { id: 'rejected', label: 'Rejected Applications', count: applications.rejected.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 -mb-px ${
              activeTab === tab.id
                ? 'border-b-2 border-accent text-accent'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr className="bg-white/5">
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  TikTok Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Applied
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {applications[activeTab].map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{user.fullName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white/70">{user.tiktokUsername}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white/70">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white/70">{user.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white/70">
                    {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {updating === user.id ? (
                        <Loader2 className="w-5 h-5 text-accent animate-spin" />
                      ) : (
                        <>
                          {getStatusIcon(user.status)}
                          <span className={`ml-2 text-sm ${getStatusColor(user.status)}`}>
                            {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Pending'}
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button
                      onClick={() => setSelectedMember(user)}
                      className="text-accent hover:text-accent-hover transition-colors"
                      disabled={updating === user.id}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {applications[activeTab].length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-white/70">
                    No {activeTab} applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <MemberDetailsPanel 
        member={selectedMember} 
        onClose={() => setSelectedMember(null)}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
}