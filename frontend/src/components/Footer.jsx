import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#03060d] pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* BRAND COLUMN */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20">
                <div className="w-full h-full bg-[#070b19] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                Pixora AI
              </span>
            </div>

            <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
              State-of-the-art neural restoration and image upscaling platform. Designed for photographers, designers, and archivists demanding crystal-clear clarity.
            </p>
          </div>

          {/* NAVIGATION LINKS */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollTo('studio-section')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Enhance Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('showcase-section')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Before & After Showcase
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('capabilities-section')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  AI Model Capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('workflow-section')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>


        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Pixora AI Image Enhancement Suite. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>for high-fidelity image restoration</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
