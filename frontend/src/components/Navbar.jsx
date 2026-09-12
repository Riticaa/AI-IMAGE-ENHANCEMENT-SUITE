import { useState, useEffect } from 'react';
import { Sparkles, Activity, Menu, X, ArrowUpRight, LogOut, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenStudio }) {
  const { currentUser, signOut } = useAuth();
  const [backendStatus, setBackendStatus] = useState('checking');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
        await axios.get(`${API_URL}/`, { timeout: 3000 });
        setBackendStatus('online');
      } catch {
        setBackendStatus('offline');
      }
    };
    checkBackend();
    const interval = setInterval(checkBackend, 12000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get user initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#050814]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* BRAND LOGO */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
            <div className="w-full h-full bg-[#070b19] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-1.5">
              Pixora
              <span className="text-xs px-2 py-0.5 rounded-full font-sans font-semibold bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                PRO
              </span>
            </span>
          </div>
        </a>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          {[
            { label: 'Enhance Studio', id: 'studio-section' },
            { label: 'Showcase', id: 'showcase-section' },
            { label: 'AI Engines', id: 'capabilities-section' },
            { label: 'Workflow', id: 'workflow-section' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-white transition-colors hover:scale-105 transform duration-150"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Backend Health Badge */}
          <div
            title={
              backendStatus === 'online'
                ? 'Backend API is connected and ready!'
                : 'FastAPI server not detected at http://127.0.0.1:8000'
            }
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md transition-all cursor-help ${
              backendStatus === 'online'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : backendStatus === 'offline'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <span className="relative flex h-2 w-2">
              {backendStatus === 'online' && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                backendStatus === 'online' ? 'bg-emerald-500' : backendStatus === 'offline' ? 'bg-amber-400' : 'bg-slate-400'
              }`}></span>
            </span>
            <span>
              {backendStatus === 'online' ? 'AI Engine Online' : backendStatus === 'offline' ? 'API Offline' : 'Connecting...'}
            </span>
          </div>

          {/* Launch Studio CTA */}
          <button
            onClick={() => { if (onOpenStudio) onOpenStudio(); scrollToSection('studio-section'); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all"
          >
            <span>Launch Studio</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* USER AVATAR + DROPDOWN */}
          {currentUser && (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.09] transition-all"
              >
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="avatar" className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white">
                    {getInitials(currentUser.displayName || currentUser.email)}
                  </div>
                )}
                <span className="text-xs font-medium text-slate-200 max-w-[100px] truncate">
                  {currentUser.displayName || currentUser.email?.split('@')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-52 bg-[#0a1020] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-white/[0.06]">
                    <p className="text-xs text-slate-500">Signed in as</p>
                    <p className="text-sm font-semibold text-white truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={() => { signOut(); setUserMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#070c1e] px-6 py-6 flex flex-col gap-4">
          {[
            { label: 'Enhance Studio', id: 'studio-section' },
            { label: 'Showcase', id: 'showcase-section' },
            { label: 'AI Engines', id: 'capabilities-section' },
            { label: 'Workflow', id: 'workflow-section' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-left text-base font-medium text-slate-200 hover:text-cyan-400 py-2"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Status: {backendStatus.toUpperCase()}</span>
            </div>
            <button
              onClick={() => scrollToSection('studio-section')}
              className="w-full py-3 rounded-xl text-center font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Launch Studio
            </button>
            {currentUser && (
              <button
                onClick={() => signOut()}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
