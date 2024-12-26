import React, { useState, useEffect } from 'react';
import { Loader2, Trash2, X, Bell } from 'lucide-react';
import { getMessages, deleteMessage, markMessageAsViewed, type Message } from '../../lib/firebase/collections/messages';
import { formatRelativeTime } from '../../utils/date';
import { useThemeStore } from '../../store/theme';

interface MessageDetailsProps {
  message: Message;
  onClose: () => void;
  onViewed: (id: string) => void;
}

function MessageDetails({ message, onClose, onViewed }: MessageDetailsProps) {
  const { theme } = useThemeStore();
  
  React.useEffect(() => {
    if (!message.viewed) {
      onViewed(message.id);
    }
  }, [message.id, message.viewed, onViewed]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-full max-w-2xl bg-[#1a1f2e] shadow-xl">
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-8 border-b border-white/10">
            <h3 className="text-2xl font-bold text-white">Message Details</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="text-white" size={24} />
            </button>
          </div>

          <div className="flex-1 p-8 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-white/70 mb-1">From</h4>
                <p className="text-lg text-white">{message.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white/70 mb-1">Email</h4>
                <p className="text-lg text-white">{message.email}</p>
              </div>
              {message.tiktokHandle && (
                <div>
                  <h4 className="text-sm font-medium text-white/70 mb-1">TikTok Handle</h4>
                  <p className="text-lg text-white">{message.tiktokHandle}</p>
                </div>
              )}
              <div>
                <h4 className="text-sm font-medium text-white/70 mb-1">Message</h4>
                <p className="text-lg text-white whitespace-pre-wrap">{message.message}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white/70 mb-1">Sent</h4>
                <p className="text-lg text-white">{formatRelativeTime(message.createdAt)}</p>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-white/10">
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

function MessageCard({ message, onView, onDelete, isDeleting }: {
  message: Message;
  onView: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}) {
  const { theme } = useThemeStore();

  return (
    <div
      className={`${
        theme === 'light'
          ? 'bg-white border-gray-200'
          : 'bg-white/10 border-white/20'
      } rounded-xl p-6 border hover:border-accent/50 transition-all duration-300`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {!message.viewed && (
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          )}
          <div>
            <h3 className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              {message.name}
            </h3>
            <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-white/50'}`}>
              {formatRelativeTime(message.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onView}
            className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-lg transition-colors"
          >
            View Message
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="p-2 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const { theme } = useThemeStore();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      setDeleting(id);
      await deleteMessage(id);
      setMessages(prev => prev.filter(msg => msg.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error('Error deleting message:', err);
      alert('Failed to delete message');
    } finally {
      setDeleting(null);
    }
  };

  const handleMarkAsViewed = async (id: string) => {
    try {
      await markMessageAsViewed(id);
      setMessages(prev => prev.map(msg => 
        msg.id === id ? { ...msg, viewed: true } : msg
      ));
    } catch (err) {
      console.error('Error marking message as viewed:', err);
    }
  };

  const newMessages = messages.filter(msg => !msg.viewed);
  const viewedMessages = messages.filter(msg => msg.viewed);

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
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          Messages
        </h2>
      </div>

      {/* New Messages Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="text-accent" size={20} />
          <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            New Messages
          </h3>
          {newMessages.length > 0 && (
            <span className="px-2 py-1 bg-accent/20 text-accent text-sm rounded-full">
              {newMessages.length}
            </span>
          )}
        </div>
        
        {newMessages.length === 0 ? (
          <div className={`text-center py-8 ${theme === 'light' ? 'text-gray-600' : 'text-white/70'}`}>
            No new messages
          </div>
        ) : (
          <div className="space-y-4">
            {newMessages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onView={() => setSelectedMessage(message)}
                onDelete={() => handleDelete(message.id)}
                isDeleting={deleting === message.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Viewed Messages Section */}
      <div className="space-y-4">
        <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          Viewed Messages
        </h3>
        
        {viewedMessages.length === 0 ? (
          <div className={`text-center py-8 ${theme === 'light' ? 'text-gray-600' : 'text-white/70'}`}>
            No viewed messages
          </div>
        ) : (
          <div className="space-y-4">
            {viewedMessages.map((message) => (
              <MessageCard
                key={message.id}
                message={message}
                onView={() => setSelectedMessage(message)}
                onDelete={() => handleDelete(message.id)}
                isDeleting={deleting === message.id}
              />
            ))}
          </div>
        )}
      </div>

      {selectedMessage && (
        <MessageDetails 
          message={selectedMessage} 
          onClose={() => setSelectedMessage(null)}
          onViewed={handleMarkAsViewed}
        />
      )}
    </div>
  );
}