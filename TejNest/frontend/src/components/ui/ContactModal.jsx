import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import api from '../../services/api';
import './ContactModal.css';

const ContactModal = ({ designer, onClose }) => {
  const [content, setContent] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      await api.post('/messages', {
        receiverId: designer.id,
        content: content
      });
      setSent(true);
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      alert("Failed to send message. Please log in first.");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        {sent ? (
          <div className="sent-success">
            <CheckCircle size={48} className="text-gradient-accent" />
            <h2>Message Sent!</h2>
            <p>Alex will get back to you soon.</p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>Contact {designer.username}</h2>
              <button className="close-btn" onClick={onClose}>&times;</button>
            </div>
            <div className="modal-body">
              <p>Briefly describe your project or inquiry:</p>
              <textarea 
                className="glass-panel"
                placeholder="Hi Alex, I love your work! I have a 3-bedroom apartment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button className="btn btn-glass" onClick={onClose} disabled={loading}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSend} disabled={loading || !content.trim()}>
                {loading ? 'Sending...' : 'Send Inquiry'}
                <Send size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
