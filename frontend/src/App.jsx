import { useState, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsMarquee from './components/StatsMarquee';
import Studio from './components/Studio/Studio';
import Showcase from './components/Showcase';
import Capabilities from './components/Capabilities';
import Workflow from './components/Workflow';
import Footer from './components/Footer';
import Toast from './components/Toast';

function PixoraApp() {
  const { currentUser } = useAuth();
  const [toasts, setToasts] = useState([]);

  // Show auth page if not logged in
  if (!currentUser) return <AuthPage />;

  const addToast = (({ type = 'info', title, message, duration = 5000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  });

  const dismissToast = ((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  });

  const handleLoadSampleIntoStudio = async (url, filename) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], filename, { type: blob.type || 'image/png' });
      window.dispatchEvent(new CustomEvent('pixora:load-sample', { detail: file }));
      addToast({ type: 'info', title: 'Sample Image Loaded', message: `Loaded ${filename} into the enhancement studio.` });
    } catch (e) {
      console.error('Error loading sample into studio:', e);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050814] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* AMBIENT BACKGROUND GLOW */}
      <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-10 animate-float" />
      <div className="fixed bottom-0 right-1/4 translate-x-1/2 w-[700px] h-[700px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none -z-10 animate-float-reverse" />
      <div className="fixed top-1/2 right-10 w-[400px] h-[400px] bg-cyan-500/[0.08] blur-[140px] rounded-full pointer-events-none -z-10" />

      <Toast toasts={toasts} onDismiss={dismissToast} />
      <Navbar onOpenStudio={() => {}} />
      <Hero onOpenStudio={() => {}} />
      <StatsMarquee />
      <Studio addToast={addToast} />
      <Showcase onLoadSampleIntoStudio={handleLoadSampleIntoStudio} />
      <Capabilities />
      <Workflow />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PixoraApp />
    </AuthProvider>
  );
}