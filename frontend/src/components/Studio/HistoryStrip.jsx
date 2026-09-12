import { History } from 'lucide-react';

export default function HistoryStrip({ history, activeIndex, onSelectHistoryItem }) {
  if (!history || history.length <= 1) return null;

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          <h4 className="text-sm font-semibold text-white">Session History</h4>
        </div>
        <span className="text-xs text-slate-400">
          {history.length} {history.length === 1 ? 'version' : 'versions'} created
        </span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {history.map((item, idx) => {
          const isSelected = activeIndex === idx;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectHistoryItem(idx)}
              className={`group shrink-0 flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-500/10 border-cyan-400 shadow-glow-primary'
                  : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20'
              }`}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/50 border border-white/10 shrink-0">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="pr-2">
                <div className="text-xs font-semibold text-white flex items-center gap-1">
                  <span>{item.title}</span>
                  {idx === 0 && (
                    <span className="text-[10px] px-1.5 rounded bg-white/10 text-slate-300 font-normal">
                      Base
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {item.timestamp || `Step #${idx}`}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
