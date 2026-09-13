import React, { useState } from 'react';
import { PlusCircle, Sparkles, Check, Copy, RotateCcw } from 'lucide-react';
import { BackgroundDecor } from './components/BackgroundDecor.tsx';
import { Header } from './components/Header.tsx';
import { CaseCard } from './components/CaseCard.tsx';
import { AlertModal } from './components/AlertModal.tsx';
import { OfflineIndicator } from './components/OfflineIndicator.tsx';
import { MbdCase } from './types.ts';

function getTodayString(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function App() {
  const [cases, setCases] = useState<MbdCase[]>([
    { id: '1', name: '', date: getTodayString(), reason: '' },
  ]);
  const [resultText, setResultText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [modal, setModal] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: '',
  });

  const showModal = (message: string) => {
    setModal({ isOpen: true, message });
  };

  const closeModal = () => {
    setModal({ isOpen: false, message: '' });
  };

  const handleAddCase = () => {
    const newCase: MbdCase = {
      id: Date.now().toString(),
      name: '',
      date: getTodayString(),
      reason: '',
    };
    setCases((prev) => [...prev, newCase]);
  };

  const handleRemoveCase = (id: string) => {
    if (cases.length <= 1) return;
    setCases((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdateCase = (id: string, updates: Partial<MbdCase>) => {
    setCases((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const handleReset = () => {
    setCases([{ id: Date.now().toString(), name: '', date: getTodayString(), reason: '' }]);
    setResultText('');
    setCopied(false);
  };

  const handleFillSample = () => {
    setCases([
      {
        id: '1',
        name: '陳大山',
        date: getTodayString(),
        reason: '病況穩定出院',
      },
      {
        id: '2',
        name: '王小梅',
        date: getTodayString(),
        reason: '返家自我照護，門診追蹤',
      },
    ]);
  };

  const copyToClipboard = async (text: string) => {
    let success = false;
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch (err) {
        console.warn('Clipboard API error, trying fallback', err);
      }
    }

    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        console.error('Fallback copy failed', err);
      }
    }

    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } else {
      showModal('❌ 複製失敗，請手動複製下方文字框內容。');
    }
  };

  const handleGenerateAndCopy = () => {
    let isValid = true;

    for (const c of cases) {
      if (!c.name.trim() || !c.date.trim() || !c.reason.trim()) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      showModal('⚠️ 請完整填寫所有個案的欄位資訊（個案、出院日期、出院原因）才能跟著耀西一起採蘑菇出發喔！');
      return;
    }

    const outputLines: string[] = ['🏥 【MBD通知】 🏥\n'];

    cases.forEach((c) => {
      outputLines.push('──────');
      outputLines.push(`👤 個案：${c.name.trim()}`);
      outputLines.push(`📅 出院日期：${c.date.trim()}`);
      outputLines.push(`📝 出院原因：${c.reason.trim()}`);
    });

    const finalResult = outputLines.join('\n');
    setResultText(finalResult);
    copyToClipboard(finalResult);
  };

  return (
    <div className="min-h-screen text-amber-950 p-4 sm:p-6 md:p-8 relative">
      <BackgroundDecor />

      <div className="max-w-xl mx-auto relative z-10">
        <Header />

        <main className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-amber-900 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300 shadow-xs">
              目前共 {cases.length} 組個案
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleFillSample}
                className="text-xs font-bold text-amber-900 bg-amber-200/90 hover:bg-amber-300 px-2.5 py-1 rounded-lg border border-amber-400 transition-all cursor-pointer shadow-xs"
                title="填入範例資料"
              >
                🪄 範例資料
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg border border-amber-300 transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                title="重設所有資料"
              >
                <RotateCcw className="w-3 h-3" />
                <span>重設</span>
              </button>
            </div>
          </div>

          <div id="casesContainer" className="space-y-4">
            {cases.map((c, index) => (
              <CaseCard
                key={c.id}
                index={index + 1}
                caseData={c}
                onChange={(updates) => handleUpdateCase(c.id, updates)}
                onDelete={() => handleRemoveCase(c.id)}
                canDelete={cases.length > 1}
              />
            ))}
          </div>

          {/* Add case button */}
          <button
            type="button"
            id="addCaseBtn"
            onClick={handleAddCase}
            className="add-button w-full py-3.5 text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
          >
            <PlusCircle className="w-5 h-5 text-amber-200" />
            <span>➕ 新增個案套組</span>
          </button>

          {/* Generate and copy button */}
          <div className="pt-2">
            <button
              type="button"
              id="generateBtn"
              onClick={handleGenerateAndCopy}
              className="yoshi-button w-full py-4 text-white rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl tracking-wide"
            >
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>🚀 產生並複製冒險通知文字</span>
            </button>
          </div>

          {/* Result preview output card */}
          <div className="mt-6 castle-card p-5 rounded-3xl">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="resultOutput"
                className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>📜</span> 最終產出預覽：
              </label>
              <div className="flex items-center gap-2">
                <span
                  id="copyTip"
                  className={`text-xs text-amber-950 font-bold transition-all duration-200 flex items-center gap-1 bg-amber-300 px-2.5 py-1 rounded-full border border-amber-500 shadow-xs ${
                    copied ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 text-emerald-700" /> 已成功複製！
                </span>

                {resultText && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(resultText)}
                    className="text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg border border-amber-300 flex items-center gap-1 transition-all cursor-pointer"
                    title="再次複製"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>複製</span>
                  </button>
                )}
              </div>
            </div>
            <textarea
              id="resultOutput"
              readOnly
              rows={8}
              value={resultText}
              className="w-full p-4 bg-white border-2 border-amber-600 rounded-2xl text-sm font-mono text-amber-950 focus:outline-none shadow-inner resize-y leading-relaxed"
              placeholder="點擊上方按鈕後，這裡會顯示符合指定格式的文字..."
            />
          </div>
        </main>
      </div>

      <AlertModal
        isOpen={modal.isOpen}
        message={modal.message}
        onClose={closeModal}
      />
      <OfflineIndicator />
    </div>
  );
}
