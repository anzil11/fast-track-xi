import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const themes = [
  {
    id: 'white',
    name: 'Clean White Mode',
    shortName: 'White Theme',
    mode: 'light',
    primary: '#0284c7',
    secondary: '#0369a1',
    accent: '#0284c7',
    glow: 'rgba(2, 132, 199, 0.25)',
    bgMain: '#ffffff',
    bgPanel: 'rgba(255, 255, 255, 0.95)',
    textPrimary: '#0f172a',
    textSecondary: '#475569',
    border: 'rgba(15, 23, 42, 0.08)'
  },
  {
    id: 'blue',
    name: 'Deep Blue Mode',
    shortName: 'Blue Theme',
    mode: 'dark',
    primary: '#0c8fe9',
    secondary: '#00f2fe',
    accent: '#38bdf8',
    glow: 'rgba(12, 143, 233, 0.5)',
    bgMain: '#07090e',
    bgPanel: 'rgba(15, 23, 42, 0.75)',
    textPrimary: '#ffffff',
    textSecondary: '#94a3b8',
    border: 'rgba(255, 255, 255, 0.08)'
  }
];

export function ThemeProvider({ children }) {
  // White mode is set as the default when loading the website
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('fasttrack_theme_mode');
    return saved === 'blue' ? themes[1] : themes[0];
  });

  useEffect(() => {
    localStorage.setItem('fasttrack_theme_mode', currentTheme.id);
    const root = document.documentElement;

    if (currentTheme.id === 'white') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }

    root.setAttribute('data-theme', currentTheme.id);
    root.style.setProperty('--theme-primary', currentTheme.primary);
    root.style.setProperty('--theme-secondary', currentTheme.secondary);
    root.style.setProperty('--theme-accent', currentTheme.accent);
    root.style.setProperty('--theme-glow', currentTheme.glow);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(prev => (prev.id === 'white' ? themes[1] : themes[0]));
  };

  const selectTheme = (themeId) => {
    const found = themes.find(t => t.id === themeId);
    if (found) setCurrentTheme(found);
  };

  const isWhite = currentTheme.id === 'white';

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
