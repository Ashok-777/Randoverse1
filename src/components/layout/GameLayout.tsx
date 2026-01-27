import { ReactNode, useState } from 'react';
import { Home, Play, RotateCcw } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

interface GameLayoutProps {
  children: ReactNode;
  gameName: string;
  onBack: () => void;
  onStart?: () => void;
  onRetry?: () => void;
  showStart?: boolean;
  showRetry?: boolean;
}

export default function GameLayout({
  children,
  gameName,
  onBack,
  onStart,
  onRetry,
  showStart = false,
  showRetry = false,
}: GameLayoutProps) {
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    action: 'back' | 'retry' | null;
  }>({ isOpen: false, action: null });

  const handleBackClick = () => {
    setConfirmModal({ isOpen: true, action: 'back' });
  };

  const handleRetryClick = () => {
    setConfirmModal({ isOpen: true, action: 'retry' });
  };

  const handleConfirm = () => {
    if (confirmModal.action === 'back') {
      onBack();
    } else if (confirmModal.action === 'retry' && onRetry) {
      onRetry();
    }
    setConfirmModal({ isOpen: false, action: null });
  };

  const handleCancel = () => {
    setConfirmModal({ isOpen: false, action: null });
  };

  const getMessage = () => {
    if (confirmModal.action === 'back') return 'Exit!';
    if (confirmModal.action === 'retry') return 'Retry!';
    return '';
  };

  return (
    <div className="min-h-screen animated-gradient relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Control Buttons */}
      <div className="absolute top-6 right-6 flex gap-3 z-10">
        {showStart && onStart && (
          <button
            onClick={onStart}
            className="btn-icon"
            aria-label="Start"
          >
            <Play className="w-6 h-6 fill-current" />
          </button>
        )}
        
        {showRetry && onRetry && (
          <button
            onClick={handleRetryClick}
            className="btn-icon"
            aria-label="Retry"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        )}
        
        <button
          onClick={handleBackClick}
          className="btn-icon"
          aria-label="Back to Home"
        >
          <Home className="w-6 h-6" />
        </button>
      </div>

      {/* Game Content */}
      <div className="relative z-0 min-h-screen pt-24 pb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white drop-shadow-lg animate-slide-up">
          {gameName}
        </h1>
        {children}
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message={getMessage()}
        gameName={gameName}
      />
    </div>
  );
      }
