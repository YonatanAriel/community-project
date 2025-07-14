import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Clock, Check } from 'lucide-react';
import { sendConnectionRequest } from '@/services/apiCalls';

function ConnectButton({ userId, userName, initialStatus = 'none' }) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const reason = `Hi ${userName}, I'd like to connect with you!`;
      await sendConnectionRequest(userId, reason);
      setStatus('pending');
    } catch (error) {
      console.error('Failed to send connection request:', error);
    } finally {
      setLoading(false);
    }
  };

  const buttonConfig = {
    none: {
      icon: Plus,
      text: 'Connect',
      variant: 'default',
      onClick: handleConnect,
    },
    pending: {
      icon: Clock,
      text: 'Request Sent',
      variant: 'outline',
      onClick: null,
    },
    connected: {
      icon: Check,
      text: 'Connected',
      variant: 'secondary',
      onClick: null,
    },
  };

  const config = buttonConfig[status];
  const Icon = config.icon;

  return (
    <Button
      variant={config.variant}
      onClick={config.onClick}
      disabled={loading || !config.onClick}
      className="flex items-center gap-2"
    >
      <Icon size={16} />
      {loading ? 'Sending...' : config.text}
    </Button>
  );
}

export default ConnectButton;
