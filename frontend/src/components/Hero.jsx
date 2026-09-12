import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Shield, Image as ImageIcon, Eye, Wand2 } from 'lucide-react';

export default function Hero({ onOpenStudio }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* BACKGROUND GLOW SPHERES */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-md mb-8 shadow-inner"
          >
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200 tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Next-Gen Neural Restoration 4.0
            </span>
          </motion.div>

          {/* MAIN HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08] mb-6"
          >
            Your Images,{' '}
            <span className="gradient-text-primary">
              Restored Beyond Limits
            </span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Transform blurry, low-res, or damaged photos into ultra-sharp 4K masterpieces.
            Harnessing state-of-the-art GFPGAN, Real-ESRGAN, and OpenCV pipelines right in your browser.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={() => {
                if (onOpenStudio) onOpenStudio();
                scrollTo('studio-section');
              }}
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <span>Enhance Image Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo('showcase-section')}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>View Results Gallery</span>
            </button>
          </motion.div>

          {/* KEY FEATURES PILLS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {[
              { icon: Wand2, label: 'GFPGAN Face Restore', color: 'text-violet-400' },
              { icon: Zap, label: '4K Super Resolution', color: 'text-cyan-400' },
              { icon: Shield, label: 'Bilateral Denoising', color: 'text-emerald-400' },
              { icon: ImageIcon, label: 'Instant Cutout / BG', color: 'text-pink-400' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs sm:text-sm font-medium text-slate-300"
                >
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
