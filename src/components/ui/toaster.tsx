import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`animate-slide-up p-4 rounded-lg shadow-lg border ${
            toast.variant === 'destructive'
              ? 'bg-red-500/90 border-red-600 text-white'
              : 'bg-gray-900/90 border-gray-700 text-white'
          } backdrop-blur-sm`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              {toast.title && (
                <h3 className="font-semibold mb-1">{toast.title}</h3>
              )}
              {toast.description && (
                <p className="text-sm opacity-90">{toast.description}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
