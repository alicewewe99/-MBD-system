import React from 'react';
import { Trash2, Calendar, User, FileText } from 'lucide-react';
import { MbdCase } from '../types.ts';

interface CaseCardProps {
  index: number;
  caseData: MbdCase;
  onChange: (updates: Partial<MbdCase>) => void;
  onDelete: () => void;
  canDelete: boolean;
}

const COMMON_REASONS = [
  '病況穩定出院',
  '返家療養',
  '轉院進一步治療',
  '定期門診追蹤',
];

export const CaseCard: React.FC<CaseCardProps> = ({
  index,
  caseData,
  onChange,
  onDelete,
  canDelete,
}) => {
  // Helper for quick date setting
  const setQuickDate = (daysFromToday: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    onChange({ date: `${yyyy}-${mm}-${dd}` });
  };

  return (
    <div
      id={`case-card-${caseData.id}`}
      className="case-card p-5 rounded-3xl relative transition-all"
    >
      {canDelete && (
        <button
          type="button"
          id={`remove-case-btn-${caseData.id}`}
          onClick={onDelete}
          className="remove-case-btn absolute top-4 right-4 text-amber-800 hover:text-red-700 hover:bg-red-100 transition-colors p-2 text-lg bg-amber-100 rounded-full w-10 h-10 flex items-center justify-center shadow-inner cursor-pointer"
          title="刪除此組"
          aria-label={`刪除第 ${index} 組個案`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}

      <h3 className="text-base font-bold text-amber-900 mb-3 flex items-center gap-2">
        <span className="text-xl">🍄</span> 冒險個案組別{' '}
        <span className="case-index bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full text-xs font-black border border-amber-400">
          {index}
        </span>
      </h3>

      <div className="space-y-3.5">
        <div>
          <label className="text-xs font-bold text-amber-900 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-amber-700" />
            <span>個案姓名：</span>
          </label>
          <input
            type="text"
            id={`case-name-${caseData.id}`}
            value={caseData.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="case-name w-full px-4 py-2.5 bg-amber-50/80 border-2 border-amber-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-sm transition-all font-medium text-amber-950 placeholder-amber-400 shadow-sm"
            placeholder="請輸入個案姓名 (例如：林小明)"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>出院日期：</span>
              </label>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setQuickDate(0)}
                  className="text-[10px] font-bold bg-amber-200 hover:bg-amber-300 text-amber-900 px-1.5 py-0.5 rounded border border-amber-400 transition-colors"
                >
                  今天
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDate(1)}
                  className="text-[10px] font-bold bg-amber-200 hover:bg-amber-300 text-amber-900 px-1.5 py-0.5 rounded border border-amber-400 transition-colors"
                >
                  明天
                </button>
              </div>
            </div>
            <input
              type="date"
              id={`case-date-${caseData.id}`}
              value={caseData.date}
              onChange={(e) => onChange({ date: e.target.value })}
              className="case-date w-full px-4 py-2.5 bg-amber-50/80 border-2 border-amber-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-sm transition-all font-medium text-amber-950 shadow-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-amber-900 mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-700" />
              <span>出院原因：</span>
            </label>
            <input
              type="text"
              id={`case-reason-${caseData.id}`}
              value={caseData.reason}
              onChange={(e) => onChange({ reason: e.target.value })}
              className="case-reason w-full px-4 py-2.5 bg-amber-50/80 border-2 border-amber-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-sm transition-all font-medium text-amber-950 placeholder-amber-400 shadow-sm"
              placeholder="請輸入出院原因"
            />
          </div>
        </div>

        {/* Quick reason tag recommendations */}
        <div className="pt-1 flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-amber-800">快速填寫原因：</span>
          {COMMON_REASONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onChange({ reason: r })}
              className="text-[11px] bg-amber-100/90 hover:bg-amber-200 hover:text-red-800 text-amber-900 px-2 py-0.5 rounded-lg border border-amber-300 transition-all cursor-pointer"
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
