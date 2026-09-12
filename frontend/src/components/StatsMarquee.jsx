import { Sparkles, Zap, ShieldCheck, Award, Flame, Cpu } from 'lucide-react';

const HIGHLIGHTS = [
  { icon: Sparkles, text: 'Real-Time Neural Face Restoration with GFPGAN v1.4' },
  { icon: Zap, text: '4K Ultra-HD Super-Resolution via Real-ESRGAN' },
  { icon: ShieldCheck, text: '100% In-Memory Privacy — Zero Cloud Storage' },
  { icon: Award, text: 'Lossless High-Pass Optical Edge Sharpening' },
  { icon: Flame, text: 'Sub-Pixel Transparent Alpha Matting & Background Removal' },
  { icon: Cpu, text: 'High-Throughput Asynchronous FastAPI Core' },
];

// Duplicate items for seamless infinite loop
const ITEMS = [...HIGHLIGHTS, ...HIGHLIGHTS];

export default function StatsMarquee() {
  return (
    <div className="w-full border-y border-white/[0.08] bg-white/[0.02] backdrop-blur-md py-4 overflow-hidden">
      <div
        className="flex items-center gap-12 text-xs sm:text-sm font-semibold text-slate-300 animate-marquee"
        style={{ width: 'max-content' }}
      >
        {ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 shrink-0 px-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0"></span>
              <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="whitespace-nowrap">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
