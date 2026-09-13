import React, { useState } from 'react';
import { Download, Monitor, Smartphone, X, Check, ExternalLink } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall.ts';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (!success) {
        setShowGuide(true);
      }
    } else {
      setShowGuide(true);
    }
  };

  if (isInstalled) {
    return (
      <div className="flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs">
        <Check className="w-3.5 h-3.5 text-emerald-700" />
        <span>已加入桌面應用程式</span>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        id="pwaInstallBtn"
        onClick={handleInstallClick}
        className="group relative flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-950 px-3.5 py-1.5 rounded-2xl border-2 border-amber-600 shadow-sm transition-all duration-150 cursor-pointer active:translate-y-0.5"
        title="將可愛小烏龜 MBD通知系統加入手機或電腦桌面"
      >
        <img
          src="/icon.svg"
          alt="可愛小烏龜桌面圖示"
          className="w-5 h-5 rounded-md object-contain border border-amber-400 group-hover:scale-110 transition-transform"
          referrerPolicy="no-referrer"
        />
        <span className="text-xs font-bold flex items-center gap-1">
          <Download className="w-3.5 h-3.5 text-amber-800" />
          <span>加到桌面圖示</span>
        </span>
      </button>

      {/* Installation Instruction Modal */}
      {showGuide && (
        <div
          className="fixed inset-0 bg-amber-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 transition-opacity"
          onClick={() => setShowGuide(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-amber-50 rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-amber-700 text-left relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-amber-800 hover:text-red-700 hover:bg-amber-200 transition-colors cursor-pointer"
              aria-label="關閉"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img
                src="/pwa-192x192.png"
                alt="App Icon"
                className="w-16 h-16 rounded-2xl shadow-md border-2 border-emerald-500 bg-amber-100 object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-base font-extrabold text-amber-950">
                  將可愛小烏龜加入桌面圖示
                </h3>
                <p className="text-xs font-bold text-amber-800">
                  隨點即開・像 App 一樣快速填寫發送
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-amber-950 font-medium">
              {/* Desktop (Chrome / Edge) */}
              <div className="bg-white/80 p-3 rounded-xl border border-amber-300">
                <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1 text-xs">
                  <Monitor className="w-4 h-4 text-amber-700" />
                  <span>電腦（Chrome / Edge / Safari）:</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-amber-900 pl-1 leading-relaxed">
                  <li>
                    若網址列右側有出現 <strong className="text-red-700">「安裝」</strong> 圖示（💻/⊕），直接點擊即可建立桌面捷徑。
                  </li>
                  <li>
                    或點擊右上角選單「⋮」 ➜ 選擇<strong>「儲存並分享」</strong>或<strong>「更多工具」</strong> ➜ 點擊<strong>「建立捷徑」/「安裝為應用程式」</strong>。
                  </li>
                </ol>
              </div>

              {/* iPhone / iPad */}
              <div className="bg-white/80 p-3 rounded-xl border border-amber-300">
                <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1 text-xs">
                  <Smartphone className="w-4 h-4 text-amber-700" />
                  <span>iPhone / iPad (Safari):</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-amber-900 pl-1 leading-relaxed">
                  <li>
                    點擊 Safari 底部工具列中央的 <strong>「分享」</strong> 按鈕（向上箭頭 ⎋）。
                  </li>
                  <li>
                    在選單中向下滑動，點選 <strong>「加入主畫面」</strong>（Add to Home Screen）。
                  </li>
                  <li>點擊右上角「新增」，可愛的萌龜圖示就會出現在手機桌面囉！</li>
                </ol>
              </div>

              {/* Android */}
              <div className="bg-white/80 p-3 rounded-xl border border-amber-300">
                <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1 text-xs">
                  <Smartphone className="w-4 h-4 text-amber-700" />
                  <span>Android 手機 (Chrome):</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-amber-900 pl-1 leading-relaxed">
                  <li>點擊 Chrome 右上角選單「⋮」。</li>
                  <li>選擇 <strong>「安裝應用程式」</strong> 或 <strong>「新增至主螢幕」</strong>。</li>
                </ol>
              </div>
            </div>

            {isInstallable && (
              <button
                type="button"
                onClick={async () => {
                  await install();
                  setShowGuide(false);
                }}
                className="yoshi-button w-full mt-4 py-3 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>立即啟動瀏覽器安裝</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="w-full mt-2 py-2 text-center text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors cursor-pointer"
            >
              我知道了，關閉說明
            </button>
          </div>
        </div>
      )}
    </>
  );
};
