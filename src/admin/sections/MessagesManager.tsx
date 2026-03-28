import { useState } from 'react';
import { Mail, Check, Trash2 } from 'lucide-react';
import { contactApi } from '@/lib/api';
import { toast } from 'sonner';

export function MessagesManager() {
  const [messages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const handleMarkAsRead = async (id: string) => {
    await contactApi.markAsRead(id);
    toast.success('Marked as read');
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      await contactApi.delete(id);
      toast.success('Message deleted');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-semibold text-mist">
          Messages
        </h2>
        <p className="text-mist-dark mt-1">
          Contact form submissions and inquiries.
        </p>
      </div>

      {/* Messages List */}
      <div className="portfolio-card">
        {messages.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="w-12 h-12 text-mist-dark mx-auto mb-4" />
            <h3 className="font-display text-lg font-semibold text-mist mb-2">
              No messages yet
            </h3>
            <p className="text-mist-dark">
              Messages from your contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-mist/10">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-6 hover:bg-mist/5 transition-colors cursor-pointer ${
                  !message.isRead ? 'bg-amber/5' : ''
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.isRead ? 'bg-mist/5' : 'bg-amber/10'
                    }`}>
                      <Mail className={`w-5 h-5 ${message.isRead ? 'text-mist-dark' : 'text-amber'}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-mist">{message.name}</h3>
                        {!message.isRead && (
                          <span className="w-2 h-2 rounded-full bg-amber" />
                        )}
                      </div>
                      <p className="text-mist-dark text-sm">{message.email}</p>
                      <p className="text-mist mt-2">{message.subject || 'No subject'}</p>
                      <p className="text-mist-dark text-sm mt-1 line-clamp-2">
                        {message.message}
                      </p>
                      <p className="text-mist-dark/60 text-xs mt-2">
                        {new Date(message.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!message.isRead && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleMarkAsRead(message.id); }}
                        className="p-2 rounded-lg hover:bg-mist/5 text-mist-dark hover:text-amber"
                        title="Mark as read"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(message.id); }}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-mist-dark hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="portfolio-card w-full max-w-2xl p-6 max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-semibold text-mist">
                Message Details
              </h3>
              <button 
                onClick={() => setSelectedMessage(null)} 
                className="p-2 rounded-lg hover:bg-mist/5 text-mist-dark"
              >
                Close
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-mist-dark">From</label>
                <p className="text-mist">{selectedMessage.name} ({selectedMessage.email})</p>
              </div>
              <div>
                <label className="text-sm text-mist-dark">Subject</label>
                <p className="text-mist">{selectedMessage.subject || 'No subject'}</p>
              </div>
              <div>
                <label className="text-sm text-mist-dark">Message</label>
                <p className="text-mist whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div>
                <label className="text-sm text-mist-dark">Received</label>
                <p className="text-mist-dark">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}