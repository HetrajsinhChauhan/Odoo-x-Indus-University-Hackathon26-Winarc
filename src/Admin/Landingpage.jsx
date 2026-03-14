import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  ArrowLeft,
  Package, 
  Building2, 
  LineChart, 
  Boxes,
  Search,
  Bell,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  TrendingUp,
  LayoutDashboard,
  Settings,
  Users
} from 'lucide-react';

export default function Landingpage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  const [forgotStep, setForgotStep] = useState(1);
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  return (
    <div className="app-wrapper">
      <style>{`
        /* =========================================
           CSS VARIABLES (Modern Palette)
           ========================================= */
        :root {
          --slate-50: #f8fafc;
          --slate-100: #f1f5f9;
          --slate-200: #e2e8f0;
          --slate-300: #cbd5e1;
          --slate-400: #94a3b8;
          --slate-500: #64748b;
          --slate-600: #475569;
          --slate-700: #334155;
          --slate-800: #1e293b;
          --slate-900: #0f172a;
          
          --indigo-50: #eef2ff;
          --indigo-100: #e0e7ff;
          --indigo-200: #c7d2fe;
          --indigo-400: #818cf8;
          --indigo-500: #6366f1;
          --indigo-600: #4f46e5;
          --indigo-700: #4338ca;
          --indigo-900: #312e81;

          --blue-50: #eff6ff;
          --blue-500: #3b82f6;

          --emerald-50: #ecfdf5;
          --emerald-100: #d1fae5;
          --emerald-500: #10b981;
          --emerald-600: #059669;
          --emerald-700: #047857;

          --amber-50: #fffbeb;
          --amber-100: #fef3c7;
          --amber-600: #d97706;
          --amber-700: #b45309;

          --red-50: #fef2f2;
          --red-100: #fee2e2;
          --red-600: #dc2626;
          --red-700: #b91c1c;

          --shadow-sm: 0 2px 8px -2px rgba(15, 23, 42, 0.05);
          --shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.08);
          --shadow-md: 0 12px 24px -4px rgba(15, 23, 42, 0.08);
          --shadow-lg: 0 20px 32px -4px rgba(15, 23, 42, 0.1);
          --shadow-xl: 0 32px 64px -12px rgba(15, 23, 42, 0.15);
          --shadow-2xl: 0 48px 100px -24px rgba(79, 70, 229, 0.15);
          
          --radius-md: 0.75rem;
          --radius-lg: 1rem;
          --radius-xl: 1.5rem;
          --radius-full: 9999px;
        }

        /* =========================================
           BASE STYLES & RESETS
           ========================================= */
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: "Inter", system-ui, -apple-system, sans-serif;
          background-color: #ffffff;
          color: var(--slate-900);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        ::selection { background-color: var(--indigo-100); color: var(--indigo-900); }
        a { text-decoration: none; color: inherit; }
        button { border: none; background: none; cursor: pointer; font: inherit; }
        ul { list-style: none; }
        
        /* Smooth Scrolling */
        html { scroll-behavior: smooth; }

        .app-wrapper { min-height: 100vh; display: flex; flex-direction: column; }
        .container { max-width: 76rem; margin: 0 auto; padding: 0 1.5rem; width: 100%; }
        @media (min-width: 1024px) { .container { padding: 0 2.5rem; } }

        /* =========================================
           ANIMATIONS
           ========================================= */
        .animate-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* =========================================
           COMMON COMPONENTS
           ========================================= */
        .flex-center { display: flex; align-items: center; justify-content: center; }
        .flex-between { display: flex; align-items: center; justify-content: space-between; }
        .flex-items-center { display: flex; align-items: center; }
        .gap-1 { gap: 0.25rem; } .gap-2 { gap: 0.5rem; } .gap-3 { gap: 0.75rem; } .gap-4 { gap: 1rem; }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1.75rem;
          border-radius: var(--radius-full);
          font-size: 0.9375rem;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          letter-spacing: -0.01em;
        }

        .btn-primary {
          background: linear-gradient(180deg, var(--indigo-500) 0%, var(--indigo-600) 100%);
          color: white;
          box-shadow: 0 2px 0 rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        .btn-primary:hover {
          box-shadow: 0 12px 24px -8px rgba(79, 70, 229, 0.5), inset 0 1px 0 rgba(255,255,255,0.2);
          transform: translateY(-2px);
          background: linear-gradient(180deg, var(--indigo-400) 0%, var(--indigo-500) 100%);
        }

        .btn-outline {
          background-color: white;
          color: var(--slate-700);
          border: 1px solid var(--slate-200);
          box-shadow: var(--shadow-sm);
        }

        .btn-outline:hover {
          background-color: var(--slate-50);
          border-color: var(--slate-300);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }

        .text-gradient {
          background: linear-gradient(135deg, var(--indigo-600) 0%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* =========================================
           FLOATING NAVIGATION
           ========================================= */
        .nav-wrapper {
          position: fixed;
          top: 1.5rem;
          left: 0;
          width: 100%;
          z-index: 50;
          padding: 0 1rem;
          display: flex;
          justify-content: center;
        }

        .navbar {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: var(--radius-full);
          box-shadow: 0 8px 32px -8px rgba(15, 23, 42, 0.08);
          width: 100%;
          max-width: 64rem;
          transition: all 0.3s ease;
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 3.5rem;
          padding: 0 0.5rem 0 1.25rem;
        }

        .logo { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; font-size: 1.125rem; letter-spacing: -0.03em; color: var(--slate-900); }
        .logo-icon { background: var(--indigo-600); padding: 0.375rem; border-radius: 0.5rem; color: white; display: flex; box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3); }

        .nav-links { display: none; align-items: center; gap: 2.5rem; }
        .nav-link { font-size: 0.875rem; font-weight: 500; color: var(--slate-600); transition: color 0.2s; padding: 0.5rem; }
        .nav-link:hover { color: var(--slate-900); }

        .nav-actions { display: none; align-items: center; gap: 0.5rem; }
        .nav-actions .btn { padding: 0.625rem 1.25rem; font-size: 0.875rem; }

        .mobile-menu-btn { display: flex; align-items: center; padding: 0.5rem; color: var(--slate-600); margin-right: 0.25rem; }
        
        .mobile-menu {
          position: absolute; top: calc(100% + 1rem); left: 0; width: 100%;
          background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(24px);
          border: 1px solid var(--slate-200); border-radius: var(--radius-lg);
          padding: 1rem; display: flex; flex-direction: column; gap: 0.25rem;
          box-shadow: var(--shadow-xl);
          transform-origin: top; animation: menuDrop 0.2s ease-out forwards;
        }
        
        @keyframes menuDrop {
          from { opacity: 0; transform: scaleY(0.95); }
          to { opacity: 1; transform: scaleY(1); }
        }

        .mobile-link { display: block; padding: 0.75rem 1rem; font-size: 0.9375rem; font-weight: 500; color: var(--slate-700); border-radius: var(--radius-md); }
        .mobile-link:hover { color: var(--indigo-600); background-color: var(--slate-50); }
        .mobile-actions { padding-top: 1rem; display: flex; flex-direction: column; gap: 0.5rem; border-top: 1px solid var(--slate-100); margin-top: 0.5rem; }
        .mobile-btn { width: 100%; text-align: center; padding: 0.75rem; font-size: 0.9375rem; font-weight: 500; border-radius: var(--radius-full); }
        .mobile-btn-login { background-color: var(--slate-100); color: var(--slate-700); }
        .mobile-btn-start { background: linear-gradient(180deg, var(--indigo-500) 0%, var(--indigo-600) 100%); color: white; box-shadow: inset 0 1px 0 rgba(255,255,255,0.2); }

        @media (min-width: 768px) {
          .nav-links, .nav-actions { display: flex; }
          .mobile-menu-btn { display: none; }
        }

        /* =========================================
           HERO SECTION
           ========================================= */
        .hero-section {
          position: relative; overflow: hidden;
          padding-top: 10rem; padding-bottom: 6rem;
          background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 60%);
        }

        @media (min-width: 1024px) {
          .hero-section { padding-top: 13rem; padding-bottom: 8rem; }
        }

        .bg-grid {
          position: absolute; inset: 0; z-index: -1;
          background-image: radial-gradient(var(--slate-200) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
          opacity: 0.4;
        }

        .hero-grid {
          position: relative; z-index: 10; display: grid; gap: 4rem; align-items: center;
        }

        @media (min-width: 1024px) { .hero-grid { grid-template-columns: repeat(12, 1fr); gap: 2rem; } }

        .hero-content { text-align: center; margin-bottom: 2rem; }
        @media (min-width: 1024px) { .hero-content { grid-column: span 6; text-align: left; margin-bottom: 0; } }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.375rem 1rem; border-radius: var(--radius-full);
          background-color: white; border: 1px solid var(--slate-200);
          color: var(--slate-700); font-size: 0.8125rem; font-weight: 500;
          margin-bottom: 2rem; box-shadow: var(--shadow-sm);
        }

        .hero-badge-dot { width: 0.375rem; height: 0.375rem; border-radius: var(--radius-full); background-color: var(--indigo-500); box-shadow: 0 0 8px var(--indigo-500); }

        .hero-title {
          font-size: 2.75rem; line-height: 1.05; font-weight: 800; color: var(--slate-900);
          letter-spacing: -0.04em; margin-bottom: 1.5rem;
        }

        @media (min-width: 640px) { .hero-title { font-size: 3.5rem; } }
        @media (min-width: 1024px) { .hero-title { font-size: 4.25rem; } }

        .hero-desc {
          font-size: 1.125rem; color: var(--slate-500); margin-bottom: 2.5rem;
          max-width: 40rem; margin-left: auto; margin-right: auto; line-height: 1.6;
        }

        @media (min-width: 1024px) { .hero-desc { margin-left: 0; font-size: 1.25rem; } }

        .hero-buttons { display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center; }
        @media (min-width: 640px) { .hero-buttons { flex-direction: row; } }
        @media (min-width: 1024px) { .hero-buttons { justify-content: flex-start; } }
        .hero-buttons .btn { width: 100%; }
        @media (min-width: 640px) { .hero-buttons .btn { width: auto; } }

        .hero-disclaimer { margin-top: 1.5rem; font-size: 0.8125rem; color: var(--slate-400); display: flex; align-items: center; justify-content: center; gap: 0.375rem; }
        @media (min-width: 1024px) { .hero-disclaimer { justify-content: flex-start; } }
        .disclaimer-icon { color: var(--emerald-500); }

        .hero-visual { position: relative; perspective: 1000px; }
        @media (min-width: 1024px) { .hero-visual { grid-column: span 6; } }

        .visual-glow {
          position: absolute; top: 50%; left: 50%; width: 120%; height: 120%;
          transform: translate(-50%, -50%);
          background: conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,0.15) 0deg, rgba(56,189,248,0.15) 180deg, rgba(99,102,241,0.15) 360deg);
          border-radius: 50%; filter: blur(60px); opacity: 0.8; z-index: -1;
        }

        .mockup-card {
          position: relative; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.5); border-radius: var(--radius-xl);
          box-shadow: var(--shadow-2xl), 0 0 0 1px rgba(15,23,42,0.02);
          padding: 1.5rem; transform: rotateY(-5deg) rotateX(2deg);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          animation: float 8s ease-in-out infinite; max-width: 100%; overflow: hidden;
        }

        .hero-visual:hover .mockup-card { transform: rotateY(0deg) rotateX(0deg); }

        @keyframes float {
          0% { transform: translateY(0px) rotateY(-5deg) rotateX(2deg); }
          50% { transform: translateY(-20px) rotateY(-2deg) rotateX(4deg); }
          100% { transform: translateY(0px) rotateY(-5deg) rotateX(2deg); }
        }

        .mockup-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--slate-100); }
        .mockup-stat-icon { width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md); background: linear-gradient(135deg, var(--indigo-50) 0%, white 100%); border: 1px solid var(--indigo-100); display: flex; align-items: center; justify-content: center; color: var(--indigo-600); box-shadow: var(--shadow-sm); }
        .mockup-stat-title { font-size: 0.875rem; font-weight: 600; color: var(--slate-900); }
        .mockup-stat-subtitle { font-size: 0.75rem; color: var(--slate-500); }
        .mockup-value-large { font-size: 1.5rem; font-weight: 700; color: var(--slate-900); text-align: right; letter-spacing: -0.02em; }
        .mockup-trend { font-size: 0.75rem; font-weight: 600; color: var(--emerald-600); display: flex; align-items: center; gap: 0.25rem; justify-content: flex-end; }
        
        .mockup-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .mockup-item { display: flex; align-items: center; justify-content: space-between; padding: 0.875rem; border-radius: var(--radius-lg); border: 1px solid var(--slate-50); background: white; transition: all 0.2s; cursor: default; box-shadow: var(--shadow-sm); }
        .mockup-item:hover { transform: scale(1.02); border-color: var(--slate-200); box-shadow: var(--shadow-md); }
        .mockup-item-icon { width: 2.25rem; height: 2.25rem; border-radius: var(--radius-md); background-color: var(--slate-50); display: flex; align-items: center; justify-content: center; color: var(--slate-500); }
        .mockup-item-name { font-size: 0.875rem; font-weight: 600; color: var(--slate-900); }
        .mockup-item-sku { font-size: 0.75rem; color: var(--slate-400); }
        .mockup-item-stock { font-size: 0.9375rem; font-weight: 700; color: var(--slate-900); text-align: right; margin-bottom: 0.125rem; }
        
        .status-badge { font-size: 0.625rem; padding: 0.125rem 0.5rem; border-radius: var(--radius-full); font-weight: 600; display: inline-block; letter-spacing: 0.02em; text-transform: uppercase; }
        .status-success { background-color: var(--emerald-50); color: var(--emerald-700); box-shadow: inset 0 0 0 1px rgba(16,185,129,0.2); }
        .status-warning { background-color: var(--amber-50); color: var(--amber-700); box-shadow: inset 0 0 0 1px rgba(245,158,11,0.2); }
        .status-danger { background-color: var(--red-50); color: var(--red-700); box-shadow: inset 0 0 0 1px rgba(239,68,68,0.2); }

        /* =========================================
           FEATURES SECTION
           ========================================= */
        .features-section { padding: 8rem 0; background-color: var(--slate-50); }
        .section-header { text-align: center; max-width: 42rem; margin: 0 auto 5rem auto; }
        .section-title { font-size: 2.25rem; font-weight: 800; color: var(--slate-900); margin-bottom: 1rem; letter-spacing: -0.03em; }
        .section-desc { font-size: 1.125rem; color: var(--slate-500); }

        .features-grid { display: grid; gap: 2rem; }
        @media (min-width: 768px) { .features-grid { grid-template-columns: repeat(3, 1fr); } }

        .feature-card {
          background-color: white; border-radius: var(--radius-xl); padding: 2.5rem;
          border: 1px solid var(--slate-100); box-shadow: var(--shadow-sm);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .feature-card:hover { transform: translateY(-8px); box-shadow: var(--shadow-xl); border-color: rgba(99, 102, 241, 0.1); }
        .feature-icon-wrapper { width: 3.5rem; height: 3.5rem; background: linear-gradient(135deg, var(--indigo-50) 0%, white 100%); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); border: 1px solid var(--indigo-100); display: flex; align-items: center; justify-content: center; margin-bottom: 2rem; transition: transform 0.3s; }
        .feature-card:hover .feature-icon-wrapper { transform: scale(1.1) rotate(5deg); }
        .feature-icon { color: var(--indigo-600); }
        .feature-title { font-size: 1.25rem; font-weight: 700; color: var(--slate-900); margin-bottom: 0.75rem; letter-spacing: -0.01em; }
        .feature-desc { color: var(--slate-500); line-height: 1.6; font-size: 0.9375rem; }

        /* =========================================
           DASHBOARD PREVIEW SECTION
           ========================================= */
        .dashboard-section { padding: 8rem 0; background-color: white; overflow: hidden; position: relative; }
        .dashboard-container { position: relative; z-index: 10; }
        .dashboard-app-window {
          border-radius: var(--radius-xl); border: 1px solid var(--slate-200); background-color: white;
          box-shadow: var(--shadow-2xl), 0 0 0 1px rgba(0,0,0,0.02); overflow: hidden;
          display: flex; flex-direction: column; height: 640px;
        }

        /* Mac OS Window Controls */
        .window-header { display: flex; align-items: center; padding: 1rem 1.25rem; background: var(--slate-50); border-bottom: 1px solid var(--slate-200); }
        .window-dots { display: flex; gap: 0.5rem; margin-right: 1.5rem; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .dot-close { background-color: #ff5f56; border: 1px solid #e0443e; }
        .dot-min { background-color: #ffbd2e; border: 1px solid #dea123; }
        .dot-max { background-color: #27c93f; border: 1px solid #1aab29; }
        .window-title { font-size: 0.8125rem; font-weight: 600; color: var(--slate-500); margin: 0 auto; transform: translateX(-2.5rem); }

        .dash-body { display: flex; flex: 1; overflow: hidden; flex-direction: column; }
        @media (min-width: 768px) { .dash-body { flex-direction: row; } }

        .dash-sidebar { width: 16rem; background-color: var(--slate-50); border-right: 1px solid var(--slate-200); display: none; flex-direction: column; padding: 1.25rem 1rem; }
        @media (min-width: 768px) { .dash-sidebar { display: flex; } }
        
        .dash-nav { display: flex; flex-direction: column; gap: 0.25rem; }
        .dash-nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.625rem 0.875rem; border-radius: var(--radius-md); font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
        .dash-nav-item.active { background-color: white; box-shadow: var(--shadow-sm); border: 1px solid var(--slate-200); color: var(--indigo-600); }
        .dash-nav-item:not(.active) { color: var(--slate-600); border: 1px solid transparent; }
        .dash-nav-item:not(.active):hover { background-color: var(--slate-100); color: var(--slate-900); }

        .dash-main { flex: 1; display: flex; flex-direction: column; background-color: white; overflow: hidden; }
        .dash-topbar { height: 4.5rem; border-bottom: 1px solid var(--slate-100); display: flex; align-items: center; justify-content: space-between; padding: 0 1.5rem; gap: 1rem; }
        .dash-search { display: flex; align-items: center; gap: 0.5rem; background-color: var(--slate-50); border: 1px solid var(--slate-200); padding: 0.5rem 0.875rem; border-radius: var(--radius-lg); width: 100%; max-width: 20rem; color: var(--slate-400); transition: all 0.2s; }
        .dash-search:focus-within { border-color: var(--indigo-300); background-color: white; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
        .dash-search-text { font-size: 0.875rem; width: 100%; outline: none; border: none; background: transparent; color: var(--slate-900); }
        .dash-user-actions { display: flex; align-items: center; gap: 1.25rem; color: var(--slate-400); }
        .dash-bell { cursor: pointer; transition: color 0.2s; }
        .dash-bell:hover { color: var(--slate-900); }
        .dash-avatar { width: 2.25rem; height: 2.25rem; border-radius: var(--radius-full); background: linear-gradient(135deg, var(--indigo-100) 0%, var(--indigo-200) 100%); border: 2px solid white; box-shadow: 0 0 0 1px var(--slate-200); display: flex; align-items: center; justify-content: center; color: var(--indigo-700); font-weight: 700; font-size: 0.75rem; }

        .dash-content { padding: 2rem; flex: 1; overflow: hidden; display: flex; flex-direction: column; background: #fafafa; }
        .dash-content-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; }
        .dash-content-title { font-size: 1.25rem; font-weight: 700; color: var(--slate-900); letter-spacing: -0.01em; }
        .dash-add-btn { background: var(--slate-900); color: white; font-size: 0.875rem; font-weight: 500; padding: 0.625rem 1.25rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); transition: background 0.2s; }
        .dash-add-btn:hover { background: var(--slate-800); }

        .dash-table-container { flex: 1; border: 1px solid var(--slate-200); border-radius: var(--radius-xl); overflow-x: auto; display: flex; flex-direction: column; background-color: white; box-shadow: var(--shadow-sm); }
        .dash-table-header { background-color: white; padding: 1rem 1.5rem; border-bottom: 1px solid var(--slate-100); display: grid; grid-template-columns: 5fr 3fr 2fr 2fr; gap: 1rem; font-size: 0.75rem; font-weight: 600; color: var(--slate-400); text-transform: uppercase; letter-spacing: 0.05em; min-width: 700px; }
        .text-right { text-align: right; }
        .dash-table-body { flex: 1; overflow-y: auto; overflow-x: hidden; background-color: white; padding: 0.5rem; min-width: 700px; }

        /* Custom Scrollbar */
        .dash-table-body::-webkit-scrollbar { width: 6px; }
        .dash-table-body::-webkit-scrollbar-track { background: transparent; }
        .dash-table-body::-webkit-scrollbar-thumb { background: var(--slate-200); border-radius: 10px; }
        .dash-table-body::-webkit-scrollbar-thumb:hover { background: var(--slate-300); }

        .dash-table-row { padding: 0.875rem 1rem; border-bottom: 1px solid var(--slate-50); display: grid; grid-template-columns: 5fr 3fr 2fr 2fr; gap: 1rem; align-items: center; border-radius: var(--radius-lg); transition: all 0.2s; cursor: pointer; }
        .dash-table-row:last-child { border-bottom: none; }
        .dash-table-row:hover { background-color: var(--slate-50); }

        .dash-product-cell { display: flex; align-items: center; gap: 1rem; }
        .dash-product-icon { width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md); background-color: var(--slate-50); border: 1px solid var(--slate-100); display: flex; align-items: center; justify-content: center; color: var(--slate-400); }
        .dash-product-name { font-size: 0.875rem; font-weight: 600; color: var(--slate-900); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-right: 1rem; }
        .dash-product-sku { font-size: 0.75rem; color: var(--slate-500); margin-top: 0.125rem; }
        .dash-category { font-size: 0.875rem; color: var(--slate-600); font-weight: 500; }
        .dash-stock { font-size: 0.875rem; font-weight: 700; color: var(--slate-900); }
        .dash-status-cell { display: flex; justify-content: flex-end; }
        
        .table-status-badge { display: inline-flex; align-items: center; padding: 0.25rem 0.625rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; letter-spacing: 0.02em; }
        .table-status-healthy { background-color: var(--emerald-50); color: var(--emerald-700); box-shadow: inset 0 0 0 1px rgba(16,185,129,0.2); }
        .table-status-low { background-color: var(--amber-50); color: var(--amber-700); box-shadow: inset 0 0 0 1px rgba(245,158,11,0.2); }
        .table-status-out { background-color: var(--red-50); color: var(--red-700); box-shadow: inset 0 0 0 1px rgba(239,68,68,0.2); }
        .status-icon-sm { margin-right: 0.375rem; }

        /* =========================================
           CTA SECTION
           ========================================= */
        .cta-section { padding: 6rem 0 8rem 0; background-color: white; }
        .cta-card { background: linear-gradient(135deg, var(--slate-900) 0%, #020617 100%); border-radius: 2rem; padding: 4rem 2rem; text-align: center; position: relative; overflow: hidden; box-shadow: var(--shadow-2xl); max-width: 64rem; margin: 0 auto; }
        @media (min-width: 768px) { .cta-card { padding: 5rem 4rem; } }
        .cta-decoration-1 { position: absolute; top: -50%; right: -10%; width: 30rem; height: 30rem; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%); filter: blur(40px); }
        .cta-decoration-2 { position: absolute; bottom: -50%; left: -10%; width: 30rem; height: 30rem; border-radius: 50%; background: radial-gradient(circle, rgba(14,165,233,0.3) 0%, transparent 70%); filter: blur(40px); }
        .cta-content { position: relative; z-index: 10; }
        .cta-title { font-size: 2.25rem; font-weight: 800; color: white; margin-bottom: 1.5rem; letter-spacing: -0.03em; }
        @media (min-width: 768px) { .cta-title { font-size: 3.5rem; } }
        .cta-desc { font-size: 1.125rem; color: var(--slate-300); margin-bottom: 3rem; max-width: 36rem; margin-left: auto; margin-right: auto; line-height: 1.6; }
        .cta-buttons { display: flex; flex-direction: column; gap: 1rem; align-items: center; justify-content: center; }
        @media (min-width: 640px) { .cta-buttons { flex-direction: row; } }
        
        .btn-cta-primary { background-color: white; color: var(--slate-900); padding: 1rem 2.5rem; font-size: 1.0625rem; font-weight: 600; border-radius: var(--radius-full); transition: all 0.3s; width: 100%; box-shadow: 0 4px 14px 0 rgba(255,255,255,0.39); }
        .btn-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,255,255,0.23); }
        .btn-cta-secondary { background-color: rgba(255, 255, 255, 0.1); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 1rem 2.5rem; font-size: 1.0625rem; font-weight: 600; border-radius: var(--radius-full); transition: all 0.3s; backdrop-filter: blur(12px); width: 100%; }
        .btn-cta-secondary:hover { background-color: rgba(255, 255, 255, 0.15); border-color: rgba(255,255,255,0.3); }
        @media (min-width: 640px) { .btn-cta-primary, .btn-cta-secondary { width: auto; } }

        /* =========================================
           FOOTER
           ========================================= */
        .footer { background-color: white; border-top: 1px solid var(--slate-100); padding-top: 5rem; padding-bottom: 2rem; }
        .footer-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; margin-bottom: 4rem; }
        @media (min-width: 640px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 768px) { .footer-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1024px) { .footer-grid { grid-template-columns: repeat(5, 1fr); } }
        .footer-brand { grid-column: 1 / -1; }
        @media (min-width: 1024px) { .footer-brand { grid-column: span 2; padding-right: 3rem; } }
        .footer-logo { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem; }
        .footer-logo-icon { background: var(--indigo-600); padding: 0.375rem; border-radius: 0.5rem; color: white; display: flex; box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3); }
        .footer-logo-text { font-weight: 800; font-size: 1.25rem; color: var(--slate-900); letter-spacing: -0.03em; }
        .footer-desc { font-size: 0.9375rem; color: var(--slate-500); max-width: 20rem; line-height: 1.6; }
        .footer-col-title { font-weight: 700; color: var(--slate-900); font-size: 0.9375rem; margin-bottom: 1.25rem; }
        .footer-col-list { display: flex; flex-direction: column; gap: 0.875rem; }
        .footer-link { font-size: 0.9375rem; color: var(--slate-500); transition: color 0.2s; font-weight: 500; }
        .footer-link:hover { color: var(--indigo-600); }
        .footer-bottom { padding-top: 2rem; border-top: 1px solid var(--slate-100); display: flex; flex-direction: column; align-items: center; gap: 1rem; text-align: center; }
        @media (min-width: 768px) { .footer-bottom { flex-direction: row; justify-content: space-between; text-align: left; } }
        .footer-copyright { font-size: 0.875rem; color: var(--slate-400); }
        .footer-legal { display: flex; gap: 1.5rem; font-size: 0.875rem; color: var(--slate-400); font-weight: 500; }
        .footer-legal-link:hover { color: var(--slate-900); }

        /* =========================================
           AUTH PAGES (Ultra Modern)
           ========================================= */
        .auth-container { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; overflow: hidden; background-color: var(--slate-50); }
        .auth-bg-shape { position: absolute; border-radius: 50%; filter: blur(100px); z-index: 0; animation: floatShape 15s infinite ease-in-out alternate; }
        .shape-1 { width: 600px; height: 600px; background: rgba(99, 102, 241, 0.15); top: -200px; left: -200px; }
        .shape-2 { width: 700px; height: 700px; background: rgba(14, 165, 233, 0.15); bottom: -300px; right: -200px; animation-delay: -5s; }

        @keyframes floatShape {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(50px, 80px) scale(1.1); }
        }

        .auth-card {
          width: 100%; max-width: 28rem;
          background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(32px); -webkit-backdrop-filter: blur(32px);
          border-radius: 1.75rem; padding: 3rem;
          box-shadow: var(--shadow-2xl), 0 0 0 1px rgba(255,255,255,0.6) inset;
          border: 1px solid rgba(226, 232, 240, 0.5);
          position: relative; z-index: 10;
          animation: slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .auth-header { text-align: center; margin-bottom: 2.5rem; }
        .auth-logo { display: inline-flex; align-items: center; gap: 0.625rem; margin-bottom: 1.5rem; }
        .auth-logo-icon { background: var(--indigo-600); color: white; padding: 0.5rem; border-radius: 0.625rem; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); }
        .auth-logo-text { font-weight: 800; font-size: 1.5rem; color: var(--slate-900); letter-spacing: -0.03em; }
        .auth-title { font-size: 1.75rem; font-weight: 800; color: var(--slate-900); margin-bottom: 0.5rem; letter-spacing: -0.02em; }
        .auth-subtitle { color: var(--slate-500); font-size: 0.9375rem; }

        .form-group { position: relative; margin-bottom: 1.5rem; }
        .form-input {
          width: 100%; padding: 1.125rem 1rem; font-size: 0.9375rem; color: var(--slate-900);
          background-color: rgba(248, 250, 252, 0.7); border: 1px solid transparent;
          border-radius: var(--radius-lg); outline: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .form-input:focus { background-color: white; border-color: var(--indigo-400); box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }
        .form-input::placeholder { color: transparent; }
        
        .floating-label {
          position: absolute; left: 1rem; top: 1.125rem; color: var(--slate-400); font-size: 0.9375rem;
          pointer-events: none; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: left top;
        }

        .form-input:focus ~ .floating-label,
        .form-input:not(:placeholder-shown) ~ .floating-label {
          transform: translateY(-2rem) scale(0.85); color: var(--indigo-600); font-weight: 500;
        }

        .auth-btn { width: 100%; padding: 1rem; font-size: 1.0625rem; margin-top: 1rem; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2); }
        .auth-footer { margin-top: 2rem; text-align: center; font-size: 0.9375rem; color: var(--slate-500); }
        .auth-link { color: var(--indigo-600); font-weight: 600; cursor: pointer; transition: color 0.2s; }
        .auth-link:hover { color: var(--indigo-800); text-decoration: underline; }

        .forgot-pass-link { position: absolute; right: 0; top: -1.75rem; font-size: 0.8125rem; color: var(--indigo-600); font-weight: 600; cursor: pointer; z-index: 5; transition: color 0.2s; }
        .forgot-pass-link:hover { color: var(--indigo-800); }

        .otp-container { display: flex; gap: 0.75rem; justify-content: center; margin-bottom: 2rem; margin-top: 1rem; }
        .otp-input {
          width: 4rem; height: 4.5rem; text-align: center; font-size: 1.75rem; font-weight: 700;
          background-color: rgba(248, 250, 252, 0.7); border: 1px solid transparent; border-radius: var(--radius-lg);
          outline: none; transition: all 0.3s; color: var(--slate-900);
        }
        .otp-input:focus { background-color: white; border-color: var(--indigo-400); box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); transform: translateY(-2px); }
        
        .back-btn { position: absolute; top: 2rem; left: 2rem; color: var(--slate-500); cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.375rem; font-size: 0.9375rem; font-weight: 600; z-index: 20; background: white; padding: 0.5rem 1rem; border-radius: var(--radius-full); box-shadow: var(--shadow-sm); border: 1px solid var(--slate-100); }
        .back-btn:hover { color: var(--slate-900); transform: translateX(-4px); box-shadow: var(--shadow); }
        
        .step-enter { animation: fadeInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>

      {currentView === 'login' && (
        <div className="auth-container">
          <div className="auth-bg-shape shape-1"></div>
          <div className="auth-bg-shape shape-2"></div>
          
          <div className="back-btn" onClick={() => setCurrentView('landing')}>
            <ArrowLeft size={16} /> Back
          </div>

          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-logo">
                <div className="auth-logo-icon"><Boxes size={24} /></div>
              </div>
              <h2 className="auth-title">Wandore Portal</h2>
              <p className="auth-subtitle">Welcome back. Enter your details.</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <input type="email" id="email" className="form-input" placeholder=" " required />
                <label htmlFor="email" className="floating-label">Email address</label>
              </div>
              <div className="form-group" style={{marginTop: '2.5rem'}}>
                <span className="forgot-pass-link" onClick={() => { setCurrentView('forgot-password'); setForgotStep(1); }}>Forgot password?</span>
                <input type="password" id="password" className="form-input" placeholder=" " required />
                <label htmlFor="password" className="floating-label">Password</label>
              </div>
              
              <button type="button" className="btn btn-primary auth-btn">
                Sign In
              </button>
            </form>

            <div className="auth-footer">
              Not a Wandore partner yet? <span className="auth-link">Apply now</span>
            </div>
          </div>
        </div>
      )}

      {currentView === 'forgot-password' && (
        <div className="auth-container">
          <div className="auth-bg-shape shape-1"></div>
          <div className="auth-bg-shape shape-2"></div>
          
          <div className="back-btn" onClick={() => setCurrentView('login')}>
            <ArrowLeft size={16} /> Login
          </div>

          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-logo">
                <div className="auth-logo-icon"><Boxes size={24} /></div>
              </div>
              <h2 className="auth-title">Reset Password</h2>
              <p className="auth-subtitle">
                {forgotStep === 1 && "Enter your email to receive an OTP"}
                {forgotStep === 2 && "Enter the 4-digit OTP sent to your email"}
                {forgotStep === 3 && "Create a new secure password"}
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="step-enter" key={forgotStep}>
              {forgotStep === 1 && (
                <>
                  <div className="form-group" style={{marginTop: '2.5rem'}}>
                    <input type="email" id="reset-email" className="form-input" placeholder=" " required />
                    <label htmlFor="reset-email" className="floating-label">Email address</label>
                  </div>
                  <button type="button" className="btn btn-primary auth-btn" onClick={() => setForgotStep(2)}>
                    Send OTP
                  </button>
                </>
              )}

              {forgotStep === 2 && (
                <>
                  <div className="otp-container">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="otp-input"
                        value={data}
                        onChange={(e) => handleOtpChange(e.target, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                  <button type="button" className="btn btn-primary auth-btn" onClick={() => setForgotStep(3)}>
                    Verify OTP
                  </button>
                  <div className="auth-footer" style={{ marginTop: '1.5rem' }}>
                    Didn't receive code? <span className="auth-link">Resend</span>
                  </div>
                </>
              )}

              {forgotStep === 3 && (
                <>
                  <div className="form-group" style={{marginTop: '2.5rem'}}>
                    <input type="password" id="new-password" className="form-input" placeholder=" " required />
                    <label htmlFor="new-password" className="floating-label">New Password</label>
                  </div>
                  <div className="form-group" style={{marginTop: '2.5rem'}}>
                    <input type="password" id="confirm-password" className="form-input" placeholder=" " required />
                    <label htmlFor="confirm-password" className="floating-label">Confirm Password</label>
                  </div>
                  <button type="button" className="btn btn-primary auth-btn" onClick={() => setCurrentView('login')}>
                    Reset Password
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      <div style={{ display: currentView === 'landing' ? 'block' : 'none' }}>
      {/* Navigation */}
      <div className="nav-wrapper animate-up delay-1">
        <nav className="navbar">
          <div className="nav-content">
            {/* Logo */}
            <div className="logo">
              <div className="logo-icon">
                <Boxes size={18} />
              </div>
              <span>CoreInventory</span>
            </div>

            {/* Desktop Links */}
            <div className="nav-links">
              <a href="#features" className="nav-link">Features</a>
              <a href="#docs" className="nav-link">Docs</a>
              <a href="#pricing" className="nav-link">Pricing</a>
            </div>

            {/* Login / CTA */}
            <div className="nav-actions">
              <button onClick={() => setCurrentView('login')} className="nav-link" style={{marginRight: '0.5rem'}}>Log in</button>
              <a href="#signup" className="btn btn-primary">
                Get Started
              </a>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mobile-menu">
              <a href="#features" className="mobile-link">Features</a>
              <a href="#docs" className="mobile-link">Docs</a>
              <a href="#pricing" className="mobile-link">Pricing</a>
              <div className="mobile-actions">
                <button onClick={() => { setCurrentView('login'); setIsMobileMenuOpen(false); }} className="mobile-btn mobile-btn-login">Log in</button>
                <a href="#signup" className="mobile-btn mobile-btn-start">Get Started</a>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="bg-grid"></div>
        <div className="container hero-grid">
          {/* Hero Content */}
          <div className="hero-content">
            <div className="hero-badge animate-up">
              <span className="hero-badge-dot"></span>
              CoreInventory 2.0 is live
            </div>
            <h1 className="hero-title animate-up delay-1">
              Inventory automation for <span className="text-gradient">modern teams.</span>
            </h1>
            <p className="hero-desc animate-up delay-2">
              Stop manually tracking stock. CoreInventory syncs your warehouses, automates reordering, and gives you real-time visibility into your entire supply chain.
            </p>
            <div className="hero-buttons animate-up delay-3">
              <a href="#start" className="btn btn-primary">
                Get Started <ArrowRight size={18} />
              </a>
              <a href="#learn-more" className="btn btn-outline">
                Book a Demo
              </a>
            </div>
            <p className="hero-disclaimer animate-up delay-4">
              <CheckCircle2 size={16} className="disclaimer-icon" /> No credit card required. 14-day free trial.
            </p>
          </div>

          {/* Hero Illustration / Mini Mockup */}
          <div className="hero-visual animate-up delay-2">
            <div className="visual-glow"></div>
            <div className="mockup-card">
              <div className="mockup-header">
                <div className="flex-items-center gap-3">
                  <div className="mockup-stat-icon">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <p className="mockup-stat-title">Total Value</p>
                    <p className="mockup-stat-subtitle">Across all warehouses</p>
                  </div>
                </div>
                <div>
                  <p className="mockup-value-large">$842,500.00</p>
                  <p className="mockup-trend">
                    <TrendingUp size={14} /> +12.5%
                  </p>
                </div>
              </div>
              <div className="mockup-list">
                {[
                  { name: 'MacBook Pro 16"', sku: 'SKU-MBP-16', stock: 142, status: 'In Stock', colorClass: 'status-success' },
                  { name: 'Ergonomic Chair', sku: 'SKU-ERG-01', stock: 12, status: 'Low Stock', colorClass: 'status-warning' },
                  { name: 'Mechanical Keyboard', sku: 'SKU-KB-02', stock: 0, status: 'Out of Stock', colorClass: 'status-danger' },
                ].map((item, i) => (
                  <div key={i} className="mockup-item">
                    <div className="flex-items-center gap-3">
                      <div className="mockup-item-icon">
                        <Package size={16} />
                      </div>
                      <div>
                        <p className="mockup-item-name">{item.name}</p>
                        <p className="mockup-item-sku">{item.sku}</p>
                      </div>
                    </div>
                    <div>
                      <p className="mockup-item-stock">{item.stock}</p>
                      <span className={`status-badge ${item.colorClass}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Everything you need to scale</h2>
            <p className="section-desc">
              Powerful features designed to automate your workflows and eliminate stockouts forever.
            </p>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Package className="feature-icon" size={24} />
              </div>
              <h3 className="feature-title">Product Management</h3>
              <p className="feature-desc">
                Centralize your product catalog with variants, custom SKUs, and barcode generation. Bulk import in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Building2 className="feature-icon" size={24} />
              </div>
              <h3 className="feature-title">Multi-Warehouse Support</h3>
              <p className="feature-desc">
                Track stock levels across multiple locations, retail stores, or dropshipping partners from one unified dashboard.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <LineChart className="feature-icon" size={24} />
              </div>
              <h3 className="feature-title">Real-Time Analytics</h3>
              <p className="feature-desc">
                Make data-driven decisions with forecasting, COGS analysis, and automated low-stock alerts sent to your email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="dashboard-section">
        <div className="container dashboard-container">
          <div className="section-header">
            <h2 className="section-title">A dashboard you'll love using</h2>
            <p className="section-desc">
              No clunky interfaces. Core is built for speed, simplicity, and joy.
            </p>
          </div>

          {/* Full Dashboard UI Mockup */}
          <div className="dashboard-app-window">
            
            {/* Mac OS Controls */}
            <div className="window-header">
               <div className="window-dots">
                 <span className="dot dot-close"></span>
                 <span className="dot dot-min"></span>
                 <span className="dot dot-max"></span>
               </div>
               <div className="window-title">coreinventory.app</div>
            </div>

            <div className="dash-body">
              {/* Mock Sidebar */}
              <div className="dash-sidebar">
                <div className="dash-nav">
                  <div className="dash-nav-item active">
                    <LayoutDashboard size={16} /> Dashboard
                  </div>
                  <div className="dash-nav-item">
                    <Package size={16} /> Inventory
                  </div>
                  <div className="dash-nav-item">
                    <Building2 size={16} /> Warehouses
                  </div>
                  <div className="dash-nav-item">
                    <Users size={16} /> Suppliers
                  </div>
                  <div className="dash-nav-item" style={{marginTop: 'auto'}}>
                    <Settings size={16} /> Settings
                  </div>
                </div>
              </div>

              {/* Mock Main Content */}
              <div className="dash-main">
                {/* Mock Topbar */}
                <div className="dash-topbar">
                  <div className="dash-search">
                    <Search size={16} />
                    <input type="text" className="dash-search-text" placeholder="Search inventory..." disabled />
                  </div>
                  <div className="dash-user-actions">
                    <Bell size={20} className="dash-bell" />
                    <div className="dash-avatar">JD</div>
                  </div>
                </div>

                {/* Mock Page Content */}
                <div className="dash-content">
                  <div className="dash-content-header">
                    <h3 className="dash-content-title">Inventory Overview</h3>
                    <button className="dash-add-btn">+ Add Product</button>
                  </div>

                  {/* Mock Table */}
                  <div className="dash-table-container">
                    <div className="dash-table-header">
                      <div>Product Details</div>
                      <div>Category</div>
                      <div className="text-right">Stock</div>
                      <div className="text-right">Status</div>
                    </div>
                    <div className="dash-table-body">
                      {[
                        { name: 'Wireless Noise-Cancelling Headphones', sku: 'AUDIO-WH-100', cat: 'Electronics', stock: 432, status: 'Healthy', type: 'healthy' },
                        { name: 'Ergonomic Office Chair V2', sku: 'FURN-CHR-02', cat: 'Furniture', stock: 12, status: 'Low Stock', type: 'low' },
                        { name: '4K Ultra HD Monitor 27"', sku: 'TECH-MON-27', cat: 'Electronics', stock: 85, status: 'Healthy', type: 'healthy' },
                        { name: 'Mechanical Keyboard (Brown Switches)', sku: 'TECH-KB-BR', cat: 'Accessories', stock: 0, status: 'Out of Stock', type: 'out' },
                        { name: 'USB-C Hub 7-in-1', sku: 'ACC-USB-07', cat: 'Accessories', stock: 156, status: 'Healthy', type: 'healthy' },
                      ].map((row, idx) => (
                        <div key={idx} className="dash-table-row">
                          <div className="dash-product-cell">
                            <div className="dash-product-icon">
                              <Package size={18} />
                            </div>
                            <div style={{minWidth: 0}}>
                              <p className="dash-product-name">{row.name}</p>
                              <p className="dash-product-sku">{row.sku}</p>
                            </div>
                          </div>
                          <div>
                            <span className="dash-category">{row.cat}</span>
                          </div>
                          <div className="text-right">
                            <span className="dash-stock">{row.stock}</span>
                          </div>
                          <div className="dash-status-cell">
                            <span className={`table-status-badge table-status-${row.type}`}>
                              {row.type === 'healthy' && <CheckCircle2 size={12} className="status-icon-sm" />}
                              {row.type === 'low' && <AlertCircle size={12} className="status-icon-sm" />}
                              {row.type === 'out' && <AlertCircle size={12} className="status-icon-sm" />}
                              {row.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            {/* Decorative background elements */}
            <div className="cta-decoration-1"></div>
            <div className="cta-decoration-2"></div>
            
            <div className="cta-content">
              <h2 className="cta-title">
                Ready to optimize your inventory?
              </h2>
              <p className="cta-desc">
                Join thousands of businesses that trust Core to run their supply chain operations effortlessly.
              </p>
              <div className="cta-buttons">
                <button className="btn-cta-primary">
                  Create Free Account
                </button>
                <button className="btn-cta-secondary">
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <Boxes size={18} />
                </div>
                <span className="footer-logo-text">Core</span>
              </div>
              <p className="footer-desc">
                The modern inventory management system for scaling ecommerce brands and retail businesses.
              </p>
            </div>
            
            <div>
              <h4 className="footer-col-title">Product</h4>
              <ul className="footer-col-list">
                <li><a href="#" className="footer-link">Features</a></li>
                <li><a href="#" className="footer-link">Integrations</a></li>
                <li><a href="#" className="footer-link">Pricing</a></li>
                <li><a href="#" className="footer-link">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-col-list">
                <li><a href="#" className="footer-link">About Us</a></li>
                <li><a href="#" className="footer-link">Careers</a></li>
                <li><a href="#" className="footer-link">Blog</a></li>
                <li><a href="#" className="footer-link">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Resources</h4>
              <ul className="footer-col-list">
                <li><a href="#" className="footer-link">Documentation</a></li>
                <li><a href="#" className="footer-link">Help Center</a></li>
                <li><a href="#" className="footer-link">API Reference</a></li>
                <li><a href="#" className="footer-link">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Core Inc. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#" className="footer-legal-link">Privacy Policy</a>
              <a href="#" className="footer-legal-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}