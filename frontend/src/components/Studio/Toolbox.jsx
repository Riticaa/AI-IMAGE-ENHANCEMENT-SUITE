import { 
  Rocket, 
  Sparkles, 
  Maximize2, 
  Wand2, 
  Eye, 
  Scissors, 
  Sun, 
  SunMedium, 
  Loader2 
} from 'lucide-react';

const TOOLS_CONFIG = [
  {
    id: 'enhance-all',
    endpoint: 'enhance-all',
    title: 'Enhance All',
    subtitle: 'Auto-Pilot Pipeline',
    description: 'Runs denoise, adaptive contrast, smart sharpen, and 4x super-resolution in one click.',
    tag: 'Full Neural Suite',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    icon: Rocket,
    highlight: true,
  },
  {
    id: 'face-enhance',
    endpoint: 'face-enhance',
    title: 'Face Restoration',
    subtitle: 'GFPGAN v1.4',
    description: 'Recovers degraded facial details, eyes, hair texture, and natural skin tones.',
    tag: 'GFPGAN AI',
    tagColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    icon: Sparkles,
  },
  {
    id: 'super-resolution',
    endpoint: 'super-resolution',
    title: 'Super Resolution',
    subtitle: 'Real-ESRGAN 4x',
    description: 'Increases resolution and reconstructs high-frequency textures without pixelation.',
    tag: 'Real-ESRGAN',
    tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    icon: Maximize2,
  },
  {
    id: 'denoise',
    endpoint: 'denoise',
    title: 'AI Denoise',
    subtitle: 'Noise & Grain Removal',
    description: 'Cleans low-light sensor noise and ISO grain while preserving sharp boundary edges.',
    tag: 'Non-Local Means',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    icon: Wand2,
  },
  {
    id: 'sharpen',
    endpoint: 'sharpen',
    title: 'Smart Sharpen',
    subtitle: 'Edge Reconstruction',
    description: 'Enhances optical sharpness, text clarity, and edge gradients in blurred photos.',
    tag: 'High-Pass Kernel',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    icon: Eye,
  },
  {
    id: 'background-remove',
    endpoint: 'background-remove',
    title: 'Remove Background',
    subtitle: 'Alpha Cutout',
    description: 'Segments the primary foreground subject and outputs an ultra-clean transparent PNG.',
    tag: 'Transparent PNG',
    tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    icon: Scissors,
  },
  {
    id: 'hdr-filter',
    endpoint: 'hdr-filter',
    title: 'HDR Tone Filter',
    subtitle: 'Dynamic Range',
    description: 'Balances crushed shadows and blown-out highlights using adaptive histogram equalization.',
    tag: 'CLAHE HDR',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    icon: Sun,
  },
  {
    id: 'brightness',
    endpoint: 'brightness',
    title: 'Adaptive Lighting',
    subtitle: 'Contrast & Gamma',
    description: 'Intelligently recalibrates brightness curves and contrast for faded or dark photographs.',
    tag: 'Auto-Exposure',
    tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    icon: SunMedium,
  },
];

export default function Toolbox({ onSelectTool, activeTool, loading, disabled }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          <h3 className="text-base font-display font-bold text-white tracking-wide">
            Select Enhancement Model
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">8 Specialized Engines</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {TOOLS_CONFIG.map((tool) => {
          const Icon = tool.icon;
          const isProcessing = loading && activeTool === tool.endpoint;
          const isSelected = activeTool === tool.endpoint;

          return (
            <button
              key={tool.id}
              type="button"
              disabled={disabled || loading}
              onClick={() => onSelectTool(tool.endpoint, tool.title)}
              className={`group relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                tool.highlight
                  ? isSelected
                    ? 'bg-gradient-to-br from-purple-900/60 to-blue-900/60 border-purple-400 shadow-glow-secondary'
                    : 'bg-gradient-to-br from-purple-950/30 via-indigo-950/20 to-blue-950/30 border-purple-500/30 hover:border-purple-400/60 hover:bg-purple-900/40'
                  : isSelected
                  ? 'bg-blue-950/60 border-cyan-400 shadow-glow-primary'
                  : 'bg-white/[0.02] border-white/[0.07] hover:bg-white/[0.05] hover:border-white/20'
              } ${
                disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {/* TOP ROW: ICON + TAG */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    tool.highlight
                      ? 'bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md shadow-purple-500/30'
                      : 'bg-white/[0.06] border border-white/10 text-cyan-400 group-hover:text-white group-hover:bg-cyan-500'
                  }`}
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                <span
                  className={`text-[10px] font-semibold tracking-wide px-2 py-0.5 rounded-full border ${tool.tagColor}`}
                >
                  {tool.tag}
                </span>
              </div>

              {/* TITLE & SUBTITLE */}
              <div className="font-display font-bold text-white text-base mb-0.5 flex items-center gap-1.5">
                <span>{tool.title}</span>
                {tool.highlight && (
                  <span className="text-[10px] font-sans px-1.5 py-0.2 rounded bg-purple-500 text-white font-bold">
                    RECOMMENDED
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-400 font-medium mb-2">
                {tool.subtitle}
              </div>

              {/* DESCRIPTION */}
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {tool.description}
              </p>

              {/* PROCESSING GLOW INDICATOR */}
              {isProcessing && (
                <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400 animate-pulse pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
