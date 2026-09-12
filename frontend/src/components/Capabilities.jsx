import { Sparkles, Cpu, Layers, Zap, Shield, Eye, Scissors, Sun } from 'lucide-react';

const ENGINES = [
  {
    icon: Sparkles,
    name: 'GFPGAN v1.4 Face Core',
    subtitle: 'Generative Facial Prior',
    description: 'Employs pre-trained facial component loss and GAN priors to hallucinate realistic facial features, iris clarity, teeth, and hair strands from severely corrupted portraits.',
    badge: 'Neural Network',
    color: 'from-pink-500/20 to-purple-500/10 border-pink-500/30 text-pink-400',
  },
  {
    icon: Zap,
    name: 'Real-ESRGAN Upscaler',
    subtitle: '4X Deep Super-Resolution',
    description: 'Trained on synthetic second-order degradation schemes to recover clean 4K edges and micro-textures without ringing artifacts or artificial grain patterns.',
    badge: 'Deep Learning',
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
  },
  {
    icon: Shield,
    name: 'Non-Local Means Denoising',
    subtitle: 'Adaptive Noise Suppression',
    description: 'Scans non-local patches across the image matrix to calculate pixel similarity averages, suppressing sensor ISO noise while preserving critical boundary contrasts.',
    badge: 'Computer Vision',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
  },
  {
    icon: Eye,
    name: 'High-Pass Kernel Sharpening',
    subtitle: 'Optical Deblur & Contrast',
    description: 'Convolves unsharp masking and directional Laplacian kernels to boost edge acutance, bringing soft-focused elements into sharp, crisp focus.',
    badge: 'Kernel Filtering',
    color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
  },
  {
    icon: Scissors,
    name: 'Alpha Matte Subject Isolation',
    subtitle: 'Automated Cutout Engine',
    description: 'Segments foreground human or object subjects with fine sub-pixel alpha boundary transitions, yielding a clean transparent PNG suitable for graphic design.',
    badge: 'Segmentation',
    color: 'from-violet-500/20 to-purple-500/10 border-violet-500/30 text-violet-400',
  },
  {
    icon: Sun,
    name: 'CLAHE Dynamic Tone Mapping',
    subtitle: 'High Dynamic Range (HDR)',
    description: 'Performs Contrast-Limited Adaptive Histogram Equalization across localized grid tiles, lifting dark underexposed shadows while defending highlight clips.',
    badge: 'Histogram Equalization',
    color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
  },
  {
    icon: Layers,
    name: 'Photometric Gamma Tuning',
    subtitle: 'Auto-Exposure & Balance',
    description: 'Evaluates global luma curves to apply non-linear power-law gamma transformations, correcting washed-out photos or flat color tones instantaneously.',
    badge: 'Color Science',
    color: 'from-sky-500/20 to-cyan-500/10 border-sky-500/30 text-sky-400',
  },
  {
    icon: Cpu,
    name: 'FastAPI High-Speed Pipeline',
    subtitle: 'Asynchronous Processing Core',
    description: 'Lightweight asynchronous Python backend powered by OpenCV and PyTorch for direct binary image streaming and minimal network latency.',
    badge: 'FastAPI + PyTorch',
    color: 'from-indigo-500/20 to-blue-500/10 border-indigo-500/30 text-indigo-400',
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities-section" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-300 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Engine Suite</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Powered by Cutting-Edge AI Engines
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Pixora pairs deep neural networks with low-level computer vision algorithms for unmatched restoration precision.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGINES.map((engine, idx) => {
            const Icon = engine.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${engine.color} flex items-center justify-center border`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {engine.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-1">
                    {engine.name}
                  </h3>
                  <div className="text-xs text-cyan-400 font-medium mb-3">
                    {engine.subtitle}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {engine.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
