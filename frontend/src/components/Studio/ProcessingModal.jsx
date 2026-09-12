import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu } from 'lucide-react';

const LOADING_STAGES = [
  'Decoding image matrix & color spaces...',
  'Extracting feature maps & edge frequencies...',
  'Executing neural restoration inference...',
  'Refining perceptual details & facial contours...',
  'Compiling final enhanced output tensor...',
];

export default function ProcessingModal({ activeFilterTitle }) {
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStageIndex((prev) => (prev + 1) % LOADING_STAGES.length);
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-lg glass-panel rounded-3xl p-8 sm:p-10 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 text-center relative overflow-hidden"
      >
        {/* BACKGROUND AMBIENT GLOW */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />

        {/* HOLOGRAPHIC DUAL ROTATING SPINNER */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-white/5" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-500 animate-spin" />
          <div className="absolute inset-3 rounded-full border-4 border-transparent border-b-purple-400 border-l-pink-500 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <Cpu className="w-8 h-8 text-cyan-300 animate-pulse" />
          </div>
        </div>

        {/* MODEL BADGE */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Processing: {activeFilterTitle || 'AI Enhancement Engine'}</span>
        </div>

        {/* TITLE */}
        <h3 className="text-2xl font-display font-bold text-white mb-2">
          Pixora Neural Core Working
        </h3>

        {/* DYNAMIC STAGE SUBTEXT */}
        <p className="text-sm text-slate-300 min-h-[40px] flex items-center justify-center leading-relaxed">
          {LOADING_STAGES[stageIndex]}
        </p>

        {/* PROGRESS TRACK */}
        <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden mt-6 relative">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full shadow-lg shadow-cyan-500/50"
          />
        </div>

        <div className="text-[11px] text-slate-500 mt-4">
          Heavy models (GFPGAN / Super Resolution) take 2–6s depending on GPU/CPU power.
        </div>
      </motion.div>
    </div>
  );
}
