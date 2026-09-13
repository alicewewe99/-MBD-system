import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus.ts';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-800/95 border-2 border-amber-600 px-3.5 py-2 text-xs font-bold text-amber-50 shadow-2xl backdrop-blur-xs">
      <WifiOff className="w-4 h-4 text-amber-300 animate-pulse" />
      <span>離線模式中・仍可正常產生與複製 MBD 通知文字</span>
    </div>
  );
};
