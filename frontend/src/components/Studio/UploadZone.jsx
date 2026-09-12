import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';

export default function UploadZone({ onImageSelected, currentImage, imageMeta, onClear }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onImageSelected(file);
      }
    },
    [onImageSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.jfif'],
    },
    maxFiles: 1,
  });

  // Helper to load sample bundled images directly as a File
  const loadSample = async (url, filename) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], filename, { type: blob.type || 'image/png' });
      onImageSelected(file);
    } catch (err) {
      console.error('Failed to load sample image:', err);
    }
  };

  return (
    <div className="w-full">
      {!currentImage ? (
        <div className="flex flex-col gap-5">
          {/* DROPZONE */}
          <div
            {...getRootProps()}
            className={`relative group cursor-pointer rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-300 ${
              isDragActive
                ? 'border-cyan-400 bg-cyan-500/[0.08] shadow-glow-accent scale-[1.01]'
                : 'border-white/15 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/40 hover:shadow-xl'
            }`}
          >
            <input {...getInputProps()} />

            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-[2px] shadow-lg shadow-blue-500/20 group-hover:scale-105 group-hover:shadow-blue-500/40 transition-all">
              <div className="w-full h-full bg-[#080d20] rounded-[14px] flex items-center justify-center">
                <Upload className="w-8 h-8 text-cyan-400 group-hover:animate-bounce transition-transform" />
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
              {isDragActive ? 'Drop your image right here...' : 'Upload Image to Enhance'}
            </h3>

            <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
              Drag & drop any photo or click to browse. Supports JPG, PNG, WEBP up to 25MB.
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs sm:text-sm font-semibold text-cyan-300 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 transition-all">
              <ImageIcon className="w-4 h-4" />
              <span>Browse Files from Device</span>
            </div>
          </div>

          {/* QUICK-START SAMPLE IMAGES */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>No image on hand? Try our sample photos:</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => loadSample('/old-before.png', 'vintage-sample.png')}
                className="flex-1 sm:flex-none flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-cyan-500/40 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
              >
                <img
                  src="/old-before.png"
                  alt="Vintage sample"
                  className="w-5 h-5 rounded object-cover"
                />
                <span>Vintage Portrait</span>
              </button>

              <button
                type="button"
                onClick={() => loadSample('/woman-before.png', 'portrait-sample.png')}
                className="flex-1 sm:flex-none flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-purple-500/40 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
              >
                <img
                  src="/woman-before.png"
                  alt="Damaged portrait sample"
                  className="w-5 h-5 rounded object-cover"
                />
                <span>Damaged Face</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ACTIVE FILE STATUS CARD */
        <div className="glass-panel rounded-2xl p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 overflow-hidden">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
              <img
                src={URL.createObjectURL(currentImage)}
                alt="Uploaded thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="truncate">
              <div className="text-sm font-semibold text-white truncate flex items-center gap-2">
                <span>{currentImage.name}</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-3 mt-0.5">
                <span>{(currentImage.size / (1024 * 1024)).toFixed(2)} MB</span>
                {imageMeta && (
                  <span>
                    • {imageMeta.width} × {imageMeta.height} px
                  </span>
                )}
                <span className="uppercase text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-slate-300 font-mono">
                  {currentImage.type.split('/')[1] || 'IMG'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div {...getRootProps()} className="cursor-pointer">
              <input {...getInputProps()} />
              <button
                type="button"
                className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-slate-200 hover:text-white transition-all"
              >
                Replace
              </button>
            </div>

            <button
              type="button"
              onClick={onClear}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-semibold text-rose-300 hover:text-rose-200 transition-all cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
