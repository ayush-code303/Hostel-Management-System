import React, { createContext, useContext, useEffect, useState } from 'react';
import { Sun, Moon, Eye, Type } from 'lucide-react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('unihostel_theme') || localStorage.getItem('sharda_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('unihostel_font_size') || 'normal'; // 'small' | 'normal' | 'large'
  });

  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('unihostel_contrast') === 'high';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('unihostel_theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (fontSize === 'large') {
      root.style.fontSize = '17.5px';
    } else if (fontSize === 'small') {
      root.style.fontSize = '14.5px';
    } else {
      root.style.fontSize = '16px';
    }
    localStorage.setItem('unihostel_font_size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('contrast-125');
    } else {
      root.classList.remove('contrast-125');
    }
    localStorage.setItem('unihostel_contrast', highContrast ? 'high' : 'normal');
  }, [highContrast]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const toggleContrast = () => setHighContrast(prev => !prev);
  const adjustFont = (level) => setFontSize(level);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      fontSize, 
      adjustFont, 
      highContrast, 
      toggleContrast 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeToggleButton({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer ${
        theme === 'dark'
          ? 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700 shadow-sm'
          : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 shadow-sm'
      } ${className}`}
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
    >
      {theme === 'dark' ? (
        <>
          <Sun className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
}

export function AccessibilityToolbar() {
  const { fontSize, adjustFont, highContrast, toggleContrast } = useTheme();

  return (
    <div className="flex items-center gap-1 text-[11px] font-bold">
      <span className="text-slate-400 font-semibold mr-1 hidden md:inline">Text Size:</span>
      <button
        onClick={() => adjustFont('small')}
        className={`px-1.5 py-0.5 rounded border transition-colors ${fontSize === 'small' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/10 hover:bg-white/20 border-white/20 text-slate-200'}`}
        title="Decrease Text Size (A-)"
      >
        A-
      </button>
      <button
        onClick={() => adjustFont('normal')}
        className={`px-1.5 py-0.5 rounded border transition-colors ${fontSize === 'normal' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/10 hover:bg-white/20 border-white/20 text-slate-200'}`}
        title="Standard Text Size (A)"
      >
        A
      </button>
      <button
        onClick={() => adjustFont('large')}
        className={`px-1.5 py-0.5 rounded border transition-colors ${fontSize === 'large' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white/10 hover:bg-white/20 border-white/20 text-slate-200'}`}
        title="Enlarge Text Size (A+)"
      >
        A+
      </button>

      <button
        onClick={toggleContrast}
        className={`ml-2 px-2 py-0.5 rounded border flex items-center gap-1 transition-colors ${highContrast ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-white/10 hover:bg-white/20 border-white/20 text-slate-200'}`}
        title="Toggle High Contrast Display"
      >
        <Eye className="w-3 h-3" />
        <span className="hidden sm:inline">Contrast</span>
      </button>
    </div>
  );
}
