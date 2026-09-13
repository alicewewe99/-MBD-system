import React, { useEffect } from 'react';

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, message, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="customModal"
      className="fixed inset-0 bg-amber-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-amber-50 rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-amber-700 text-center transform transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3 text-2xl border-2 border-red-300 shadow-inner">
          🍄
        </div>
        <h4 className="text-lg font-bold text-amber-950 mb-2">冒險提示</h4>
        <p id="modalMessage" className="text-sm text-amber-900 mb-6 font-medium leading-relaxed">
          {message}
        </p>
        <button
          type="button"
          id="modalCloseBtn"
          onClick={onClose}
          className="yoshi-button w-full py-3 text-white rounded-xl font-bold text-sm transition-all cursor-pointer"
        >
          確定了解
        </button>
      </div>
    </div>
  );
};
