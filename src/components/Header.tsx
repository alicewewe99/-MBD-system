import React from 'react';
import { PWAInstallButton } from './PWAInstallButton.tsx';

export const Header: React.FC = () => {
  return (
    <header className="mb-6 bg-amber-50/95 backdrop-blur-md p-5 sm:p-6 rounded-3xl border-4 border-amber-700 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-6 -right-6 text-6xl opacity-20 animate-bounce select-none pointer-events-none">
        🦖
      </div>
      <div className="absolute -bottom-6 -left-6 text-6xl opacity-20 select-none pointer-events-none">
        🍄🥚
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Top bar with install button */}
        <div className="w-full flex justify-end mb-2">
          <PWAInstallButton />
        </div>

        {/* Mascot App Icon */}
        <div className="relative mb-3 group cursor-pointer">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl p-1 bg-gradient-to-b from-amber-100 via-stone-50 to-amber-200 border-3 border-amber-600 shadow-lg group-hover:scale-105 transition-transform duration-200 flex items-center justify-center">
            <img
              src="/icon.svg"
              alt="溫暖療癒小烏龜桌面圖示 (Good Food Good Day・Better Days)"
              className="w-full h-full object-contain rounded-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 bg-amber-700 text-white text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200 shadow-xs flex items-center gap-0.5">
            <span>☕</span> App Icon
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-900 drop-shadow-sm flex items-center justify-center gap-2 flex-wrap">
          <span>☕🐢</span> MBD通知系統 <span className="text-red-600">❤️📖</span>
        </h1>
        <p className="text-xs sm:text-sm font-bold text-amber-800 mt-1.5">
          🌟 溫暖茶香與好日子・萌龜護航出院大作戰！ 🌟
        </p>
      </div>
    </header>
  );
};

