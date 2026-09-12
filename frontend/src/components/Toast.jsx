import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isError = toast.type === 'error';
          const isSuccess = toast.type === 'success';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${
                isError
                  ? 'bg-rose-950/80 border-rose-500/40 text-rose-100 shadow-rose-950/50'
                  : isSuccess
                  ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-100 shadow-emerald-950/50'
                  : 'bg-slate-900/90 border-blue-500/40 text-slate-100 shadow-blue-950/50'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
                {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {!isError && !isSuccess && <Info className="w-5 h-5 text-cyan-400" />}
              </div>

              <div className="flex-1 text-sm">
                {toast.title && <div className="font-semibold mb-0.5">{toast.title}</div>}
                <div className="opacity-90 leading-relaxed">{toast.message}</div>
              </div>

              <button
                onClick={() => onDismiss(toast.id)}
                className="shrink-0 text-white/60 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Dismiss notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
