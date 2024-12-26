import React from 'react';
import { X, Check, Ban, ArrowRight, Trash2, Loader2 } from 'lucide-react';
import type { ApplicationData } from '../../types/auth';
import { formatRelativeTime } from '../../utils/date';
import { deleteApplication } from '../../lib/firebase/collections/applications';

interface MemberDetailsPanelProps {
  member: (ApplicationData & { id: string }) | null;
  onClose: () => void;
  onAccept?: (memberId: string) => void;
  onReject?: (memberId: string) => void;
}

export default function MemberDetailsPanel({ 
  member, 
  onClose,
  onAccept,
  onReject 
}: MemberDetailsPanelProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);

  if (!member) return null;

  const details = [
    { label: 'Full Name', value: member.fullName },
    { label: 'Email', value: member.email },
    { label: 'Phone', value: member.phone },
    { label: 'Country', value: member.country },
    { label: 'TikTok Username', value: member.tiktokUsername },
    { label: 'TikTok URL', value: member.tiktokUrl },
    { label: 'Followers', value: member.followers },
    { label: 'Diamonds Earned', value: member.diamonds },
    { label: 'Invitation Code', value: member.invitationCode || 'N/A' },
    { label: 'Application Date', value: formatRelativeTime(member.createdAt) },
    { label: 'Status', value: member.status ? member.status.charAt(0).toUpperCase() + member.status.slice(1) : 'Pending' },
    { label: 'Last Updated', value: formatRelativeTime(member.updatedAt) }
  ];

  const handleAccept = () => {
    if (onAccept && member.status !== 'accepted') {
      onAccept(member.id);
    }
  };

  const handleReject = () => {
    if (onReject && member.status !== 'rejected') {
      onReject(member.id);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      try {
        setIsDeleting(true);
        await deleteApplication(member.id);
        onClose();
      } catch (error) {
        console.error('Error deleting application:', error);
        alert('Failed to delete application. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'accepted': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const renderActionButtons = () => {
    switch (member.status) {
      case 'accepted':
        return (
          <div className="space-y-4">
            <button
              onClick={handleReject}
              className="w-full px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
            >
              <ArrowRight size={20} />
              Move to Rejected
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={20} />
                  Delete Application
                </>
              )}
            </button>
          </div>
        );
      case 'rejected':
        return (
          <div className="space-y-4">
            <button
              onClick={handleAccept}
              className="w-full px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
            >
              <ArrowRight size={20} />
              Move to Accepted
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={20} />
                  Delete Application
                </>
              )}
            </button>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleAccept}
                className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <Check size={20} />
                Accept Application
              </button>
              <button
                onClick={handleReject}
                className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <Ban size={20} />
                Reject Application
              </button>
            </div>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={20} />
                  Delete Application
                </>
              )}
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full max-w-2xl bg-[#1a1f2e] shadow-xl">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-8 border-b border-white/10">
            <h3 className="text-2xl font-bold text-white">Member Details</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="text-white" size={24} />
            </button>
          </div>

          <div className="flex-1 p-8 overflow-y-auto">
            <div className="grid grid-cols-2 gap-8">
              {details.map(({ label, value }) => (
                <div key={label} className="space-y-2">
                  <p className="text-sm font-medium text-white/70">{label}</p>
                  <p className={`text-lg break-all ${
                    label === 'Status' ? getStatusColor(member.status) : 'text-white'
                  }`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 border-t border-white/10 space-y-4">
            {renderActionButtons()}
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors text-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}