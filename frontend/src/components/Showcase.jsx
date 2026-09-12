import ReactCompareImage from 'react-compare-image';
import { Sparkles, ArrowRight } from 'lucide-react';

const SHOWCASE_ITEMS = [
  {
    id: 'vintage',
    title: 'Vintage Photo Restoration',
    category: 'Scratch & Grain Recovery',
    description: 'Restores decades-old degraded monochrome prints, repairing fiber tears, smoothing grain, and recovering natural skin details.',
    modelUsed: 'GFPGAN + Super-Resolution',
    before: '/old-before.png',
    after: '/old-after.png',
  },
  {
    id: 'portrait',
    title: 'Severe Blur & Facial Recovery',
    category: 'Deep Portrait Inpainting',
    description: 'Recovers missing facial structures, sharpens blurred eyes and teeth, and restores lifelike skin texture from low-resolution scans.',
    modelUsed: 'GFPGAN v1.4 Neural Core',
    before: '/woman-before.png',
    after: '/woman-after.png',
  },
];

export default function Showcase({ onLoadSampleIntoStudio }) {
  return (
    <section id="showcase-section" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real AI Comparisons</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Before & After Showcase
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Drag the interactive slider handle left and right to inspect the dramatic difference our AI pipeline makes.
          </p>
        </div>

        {/* COMPARISON CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {SHOWCASE_ITEMS.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    {item.category}
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium">
                    {item.modelUsed}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* INTERACTIVE SLIDER CANVAS */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/60 mb-6 max-h-[420px] flex items-center justify-center">
                <ReactCompareImage
                  leftImage={item.before}
                  rightImage={item.after}
                  leftImageLabel="Original (Degraded)"
                  rightImageLabel="Pixora AI Restored"
                  sliderLineWidth={3}
                  sliderLineColor="#38bdf8"
                  handleSize={46}
                  aspectRatio="wider"
                />
              </div>

              {/* ACTION: TRY THIS SAMPLE */}
              <button
                type="button"
                onClick={() => {
                  if (onLoadSampleIntoStudio) {
                    onLoadSampleIntoStudio(item.before, `${item.id}-sample.png`);
                  }
                  document.getElementById('studio-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <span>Try Enhancing this Image in Studio</span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
