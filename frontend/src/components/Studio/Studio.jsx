import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import UploadZone from './UploadZone';
import Toolbox from './Toolbox';
import ComparisonViewer from './ComparisonViewer';
import HistoryStrip from './HistoryStrip';
import ProcessingModal from './ProcessingModal';

export default function Studio({ addToast }) {
  const [currentFile, setCurrentFile] = useState(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState(null);
  const [imageMeta, setImageMeta] = useState(null);

  const [enhancedUrl, setEnhancedUrl] = useState(null);
  const [activeFilterTitle, setActiveFilterTitle] = useState('');
  const [activeEndpoint, setActiveEndpoint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);

  const [history, setHistory] = useState([]);
  const [activeHistoryIndex, setActiveHistoryIndex] = useState(0);

  // Handle image upload / selection
  const handleImageSelected = useCallback((file) => {
    setCurrentFile(file);
    const url = URL.createObjectURL(file);
    setOriginalPreviewUrl(url);
    setEnhancedUrl(null);
    setActiveFilterTitle('');
    setIsTransparent(false);

    // Read image dimensions
    const img = new Image();
    img.onload = () => {
      setImageMeta({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.src = url;

    // Reset history with the original image as baseline
    const baseEntry = {
      title: 'Original Input',
      url,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      file,
    };
    setHistory([baseEntry]);
    setActiveHistoryIndex(0);
  }, []);

  // Listen for sample loaded from showcase
  useEffect(() => {
    const handleCustomSample = (e) => {
      if (e.detail) {
        handleImageSelected(e.detail);
      }
    };
    window.addEventListener('pixora:load-sample', handleCustomSample);
    return () => window.removeEventListener('pixora:load-sample', handleCustomSample);
  }, [handleImageSelected]);

  // Clear workspace
  const handleClear = () => {
    setCurrentFile(null);
    setOriginalPreviewUrl(null);
    setImageMeta(null);
    setEnhancedUrl(null);
    setActiveFilterTitle('');
    setIsTransparent(false);
    setHistory([]);
    setActiveHistoryIndex(0);
  };

  // Run enhancement tool
  const handleSelectTool = async (endpoint, toolTitle) => {
    if (!currentFile) {
      addToast({
        type: 'error',
        title: 'Image Required',
        message: 'Please upload or choose a sample image before running enhancement.',
      });
      return;
    }

    setLoading(true);
    setActiveEndpoint(endpoint);
    setActiveFilterTitle(toolTitle);

    const formData = new FormData();
    formData.append('file', currentFile);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await axios.post(`${API_URL}/${endpoint}/`, formData, {
        responseType: 'blob',
        timeout: 60000, // 60s timeout for heavier models like GFPGAN/ESRGAN
      });

      const isPng = endpoint === 'background-remove';
      const imageBlob = new Blob([response.data], {
        type: isPng ? 'image/png' : 'image/jpeg',
      });
      const outputUrl = URL.createObjectURL(imageBlob);

      setEnhancedUrl(outputUrl);
      setIsTransparent(isPng);

      // Add to session history
      const newEntry = {
        title: toolTitle,
        url: outputUrl,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        blob: imageBlob,
      };

      setHistory((prev) => {
        const next = [...prev, newEntry];
        setActiveHistoryIndex(next.length - 1);
        return next;
      });

      addToast({
        type: 'success',
        title: 'Enhancement Successful',
        message: `Applied ${toolTitle} to your photo.`,
      });
    } catch (err) {
      console.error('Enhancement error:', err);
      const isNetworkError = !err.response && err.code === 'ERR_NETWORK';
      addToast({
        type: 'error',
        title: 'Enhancement Failed',
        message: isNetworkError
          ? 'Cannot connect to backend at http://127.0.0.1:8000. Ensure FastAPI server is running with `python app.py`.'
          : err.response?.data?.detail || 'An unexpected error occurred during processing. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Switch between history versions
  const handleSelectHistoryItem = (index) => {
    setActiveHistoryIndex(index);
    const item = history[index];
    if (index === 0) {
      setEnhancedUrl(null);
      setActiveFilterTitle('');
    } else {
      setEnhancedUrl(item.url);
      setActiveFilterTitle(item.title);
    }
  };

  // Chain: Use enhanced image as base for subsequent filters
  const handleApplyAsBase = async () => {
    if (!enhancedUrl) return;
    try {
      const res = await fetch(enhancedUrl);
      const blob = await res.blob();
      const newFile = new File([blob], `chained-${currentFile.name}`, { type: blob.type });
      handleImageSelected(newFile);
      addToast({
        type: 'info',
        title: 'Chained as New Base',
        message: 'The enhanced image is now your new base photo for further processing!',
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section id="studio-section" className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {/* SECTION TITLE */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3">
            <span>Neural Workstation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            AI Enhancement Studio
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Upload your picture or pick a sample photo, then select any of the 8 neural models below.
          </p>
        </div>

        {/* STEP 1: UPLOAD ZONE */}
        <UploadZone
          currentImage={currentFile}
          imageMeta={imageMeta}
          onImageSelected={handleImageSelected}
          onClear={handleClear}
        />

        {/* STEP 2: TOOLBOX */}
        <Toolbox
          onSelectTool={handleSelectTool}
          activeTool={activeEndpoint}
          loading={loading}
          disabled={!currentFile}
        />

        {/* STEP 3: COMPARISON VIEWER */}
        {originalPreviewUrl && (
          <ComparisonViewer
            originalUrl={originalPreviewUrl}
            enhancedUrl={enhancedUrl}
            activeFilterTitle={activeFilterTitle}
            isTransparentResult={isTransparent}
            onApplyAsBase={enhancedUrl ? handleApplyAsBase : null}
          />
        )}

        {/* STEP 4: SESSION HISTORY STRIP */}
        <HistoryStrip
          history={history}
          activeIndex={activeHistoryIndex}
          onSelectHistoryItem={handleSelectHistoryItem}
        />
      </div>

      {/* PROCESSING MODAL */}
      {loading && <ProcessingModal activeFilterTitle={activeFilterTitle} />}
    </section>
  );
}
