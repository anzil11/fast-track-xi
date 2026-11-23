import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const themes = [
  {
    id: 'white',
    name: 'Clean White Mode',
    shortName: 'White Theme',
    mode: 'light',
    primary: '#016a97',
    secondary: '#2ea3d9',
    accent: '#016a97',
    glow: 'rgba(46, 163, 217, 0.25)',
    bgMain: '#ffffff',
    bgPanel: 'rgba(255, 255, 255, 0.95)',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    border: 'rgba(38, 51, 93, 0.12)'
  },
  {
    id: 'blue',
    name: 'Logo Brand Navy Theme',
    shortName: 'Logo Theme',
    mode: 'dark',
    primary: '#016a97',
    secondary: '#2ea3d9',
    accent: '#2ea3d9',
    glow: 'rgba(46, 163, 217, 0.45)',
    bgMain: '#070c1a',
    bgPanel: 'rgba(12, 21, 46, 0.8)',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    border: 'rgba(38, 51, 93, 0.6)'
  }
];

export function ThemeProvider({ children }) {
  // Exclusively Pure White Mode
  const [currentTheme, setCurrentTheme] = useState(themes[0]);

  useEffect(() => {
    localStorage.setItem('fasttrack_theme_mode', 'white');
    const root = document.documentElement;

    root.classList.remove('dark');
    root.classList.add('light');

    root.setAttribute('data-theme', 'white');
    root.style.setProperty('--theme-primary', currentTheme.primary);
    root.style.setProperty('--theme-secondary', currentTheme.secondary);
    root.style.setProperty('--theme-accent', currentTheme.accent);
    root.style.setProperty('--theme-glow', currentTheme.glow);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(themes[0]);
  };

  const selectTheme = () => {
    setCurrentTheme(themes[0]);
  };

  const isWhite = true;

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme, selectTheme, isWhite, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
