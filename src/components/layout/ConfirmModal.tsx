import { Check, X } from 'lucide-react';
import { ConfirmModalProps } from '@/types/game.types';

export default function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  message,
  gameName,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-purple-500/50 rounded-2xl p-8 max-w-md w-full mx-4 animate-bounce-in shadow-2xl shadow-purple-500/30">
        <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {message}
        </h2>
        <p className="text-center text-gray-400 mb-8 text-lg">
          {gameName}
        </p>
        
        <div className="flex justify-center gap-6">
          <button
            onClick={onCancel}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-red-500/50"
            aria-label="No"
          >
            <X className="w-10 h-10" strokeWidth={3} />
          </button>
          
          <button
            onClick={onConfirm}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-green-500/50"
            aria-label="Yes"
          >
            <Check className="w-10 h-10" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
}
