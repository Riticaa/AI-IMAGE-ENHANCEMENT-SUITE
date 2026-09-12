import { useState } from 'react';
import ReactCompareImage from 'react-compare-image';
import { 
  SlidersHorizontal, 
  Columns, 
  Eye, 
  Download, 
  Maximize2, 
  X, 
  Grid, 
  Sparkles, 
  RotateCcw 
} from 'lucide-react';

export default function ComparisonViewer({
  originalUrl,
  enhancedUrl,
  activeFilterTitle,
  onApplyAsBase,
  isTransparentResult = false,
}) {
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'side-by-side' | 'toggle'
  const [showOriginalInToggle, setShowOriginalInToggle] = useState(false);
  const [useCheckerboard, setUseCheckerboard] = useState(isTransparentResult);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  // When no enhanced image yet, show original preview with placeholder
  if (!enhancedUrl) {
    return (
      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-slate-300">Original Image Preview</h4>
          <span className="text-xs text-slate-500">Awaiting AI enhancement</span>
        </div>
        <div className="relative rounded-2xl overflow-hidden max-h-[500px] flex items-center justify-center bg-black/40 border border-white/10">
          <img
            src={originalUrl}
            alt="Original input"
            className="max-h-[500px] w-auto max-w-full object-contain"
          />
        </div>
      </div>
    );
  }

  const downloadFilename = `pixora-${(activeFilterTitle || 'enhanced').toLowerCase().replace(/\s+/g, '-')}.png`;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
      {/* HEADER CONTROLS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-base sm:text-lg">
              {activeFilterTitle || 'AI Enhanced Result'}
            </h4>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Enhancement Complete
            </span>
          </div>
        </div>

        {/* VIEW MODES + UTILITY BUTTONS */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Transparency Checkerboard Toggle */}
          <button
            type="button"
            onClick={() => setUseCheckerboard(!useCheckerboard)}
            title="Toggle transparency checkerboard background"
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              useCheckerboard
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">Checkerboard</span>
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setViewMode('slider')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'slider'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Slider</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('side-by-side')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'side-by-side'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side by Side</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('toggle')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'toggle'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Toggle View</span>
            </button>
          </div>

          {/* Fullscreen Modal Button */}
          <button
            type="button"
            onClick={() => setFullscreenOpen(true)}
            title="Inspect in full resolution"
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition-all"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* VIEWER CANVAS */}
      <div
        className={`relative rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center min-h-[380px] max-h-[600px] ${
          useCheckerboard ? 'checkerboard-pattern' : 'bg-[#03060f]'
        }`}
      >
        {/* SLIDER MODE */}
        {viewMode === 'slider' && (
          <div className="w-full max-h-[580px] flex items-center justify-center p-2">
            <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
              <ReactCompareImage
                leftImage={originalUrl}
                rightImage={enhancedUrl}
                leftImageLabel="Original"
                rightImageLabel="Enhanced"
                sliderLineWidth={3}
                sliderLineColor="#38bdf8"
                handleSize={44}
                aspectRatio="wider"
              />
            </div>
          </div>
        )}

        {/* SIDE-BY-SIDE MODE */}
        {viewMode === 'side-by-side' && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="relative rounded-xl overflow-hidden bg-black/50 border border-white/10 p-2 flex flex-col items-center">
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold bg-black/70 text-slate-300 border border-white/10 backdrop-blur-md">
                Original
              </span>
              <img
                src={originalUrl}
                alt="Original preview"
                className="max-h-[500px] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="relative rounded-xl overflow-hidden bg-black/50 border border-cyan-500/30 p-2 flex flex-col items-center shadow-glow-primary">
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500 text-black shadow-lg">
                Enhanced
              </span>
              <img
                src={enhancedUrl}
                alt="Enhanced preview"
                className="max-h-[500px] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}

        {/* TOGGLE / FLASH MODE */}
        {viewMode === 'toggle' && (
          <div className="w-full p-4 flex flex-col items-center justify-center gap-4">
            <div className="relative max-h-[520px] rounded-xl overflow-hidden flex items-center justify-center">
              <span
                className={`absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-all ${
                  showOriginalInToggle
                    ? 'bg-amber-500 text-black'
                    : 'bg-cyan-500 text-black shadow-lg'
                }`}
              >
                {showOriginalInToggle ? 'Showing: Original' : 'Showing: Enhanced'}
              </span>

              <img
                src={showOriginalInToggle ? originalUrl : enhancedUrl}
                alt="Toggle preview"
                className="max-h-[500px] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onMouseDown={() => setShowOriginalInToggle(true)}
                onMouseUp={() => setShowOriginalInToggle(false)}
                onTouchStart={() => setShowOriginalInToggle(true)}
                onTouchEnd={() => setShowOriginalInToggle(false)}
                className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 text-xs sm:text-sm font-semibold text-white select-none active:scale-95 transition-all cursor-pointer"
              >
                Hold to View Original
              </button>

              <button
                type="button"
                onClick={() => setShowOriginalInToggle(!showOriginalInToggle)}
                className="px-4 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-xs sm:text-sm font-semibold text-cyan-300 transition-all cursor-pointer"
              >
                Click to Flip
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          {onApplyAsBase && (
            <button
              type="button"
              onClick={onApplyAsBase}
              title="Use this enhanced image as the base to apply additional AI filters"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-purple-400" />
              <span>Chain Further Enhancements</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={enhancedUrl}
            download={downloadFilename}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Enhanced Photo</span>
          </a>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {fullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Inspection Studio — {activeFilterTitle}</span>
            </h3>
            <button
              onClick={() => setFullscreenOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div
            className={`flex-1 flex items-center justify-center rounded-2xl overflow-hidden p-4 ${
              useCheckerboard ? 'checkerboard-pattern' : 'bg-[#03060f]'
            }`}
          >
            <img
              src={enhancedUrl}
              alt="Enhanced Fullscreen"
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <a
              href={enhancedUrl}
              download={downloadFilename}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Resolution</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
