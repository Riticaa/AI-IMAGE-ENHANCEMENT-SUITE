import { Upload, Cpu, Download } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Drop Your Photo',
    subtitle: 'High-Res Ingestion',
    description: 'Upload any blurry, noisy, or aged photograph from your device, or load one of our bundled sample images in 1 click.',
    icon: Upload,
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    step: '02',
    title: 'Run Neural Models',
    subtitle: 'Deep Restoration Matrix',
    description: 'Select your preferred AI engine — from GFPGAN face reconstruction to 4x Real-ESRGAN upscaling or instant background cutouts.',
    icon: Cpu,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    step: '03',
    title: 'Compare & Export',
    subtitle: 'Side-by-Side Verification',
    description: 'Use the interactive before-and-after slider to inspect fine restored details, toggle checkerboard transparency, and download in full resolution.',
    icon: Download,
    gradient: 'from-emerald-400 to-cyan-500',
  },
];

export default function Workflow() {
  return (
    <section id="workflow-section" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3">
            <span>Seamless 3-Step Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            How Pixora Works
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Professional-grade image restoration made effortless and lightning fast.
          </p>
        </div>

        {/* 3 STEPS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-8 relative flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  {/* STEP NUMBER WATERMARK */}
                  <div className="flex items-center justify-between mb-8">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.gradient} p-[2px] shadow-lg`}
                    >
                      <div className="w-full h-full bg-[#080d20] rounded-[14px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <span className="text-4xl font-display font-black text-white/10 group-hover:text-white/20 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
                    {step.subtitle}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {step.description}
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
