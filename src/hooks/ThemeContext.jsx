import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEME_CONFIGS = [
  {
    id: 'space',
    name: 'Space',
    icon: '🌌',
    gradient: 'radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
    colors: {
      'space-950': '#030308',
      'space-900': '#05050f',
      'space-800': '#0a0a1a',
      'space-700': '#12122b',
      'nebula-purple': '#7c3aed',
      'nebula-blue': '#06b6d4',
      'nebula-pink': '#ec4899',
      'theme-from': '#7c3aed',
      'theme-via': '#3b82f6',
      'theme-to': '#06b6d4',
      'theme-muted': '#94a3b8',
    },
  },
  {
    id: 'snowy',
    name: 'Snowy',
    icon: '❄️',
    gradient: 'radial-gradient(circle at 50% 0%, rgba(125, 211, 252, 0.15) 0%, transparent 60%), linear-gradient(to bottom, #0d1527, #050914)',
    colors: {
      'space-950': '#050914',
      'space-900': '#0d1527',
      'space-800': '#1b253c',
      'space-700': '#2a3853',
      'nebula-purple': '#0ea5e9',
      'nebula-blue': '#38bdf8',
      'nebula-pink': '#e2e8f0',
      'theme-from': '#ffffff',
      'theme-via': '#93c5fd',
      'theme-to': '#38bdf8',
      'theme-muted': '#cbd5e1',
    },
  },
  {
    id: 'rainy',
    name: 'Rainy',
    icon: '🌧️',
    gradient: 'linear-gradient(to bottom, rgba(71, 85, 105, 0.15) 0%, transparent 100%), linear-gradient(to bottom, #080c18, #04060b)',
    colors: {
      'space-950': '#04060b',
      'space-900': '#080c18',
      'space-800': '#11182c',
      'space-700': '#1c2842',
      'nebula-purple': '#475569',
      'nebula-blue': '#0ea5e9',
      'nebula-pink': '#94a3b8',
      'theme-from': '#93c5fd',
      'theme-via': '#1d4ed8',
      'theme-to': '#06b6d4',
      'theme-muted': '#94a3b8',
    },
  },
  {
    id: 'cloudy',
    name: 'Cloudy',
    icon: '☁️',
    gradient: 'radial-gradient(circle at 30% 20%, rgba(148, 163, 184, 0.15) 0%, transparent 60%), linear-gradient(to bottom, #111827, #090d16)',
    colors: {
      'space-950': '#090d16',
      'space-900': '#111827',
      'space-800': '#1f2937',
      'space-700': '#374151',
      'nebula-purple': '#64748b',
      'nebula-blue': '#94a3b8',
      'nebula-pink': '#cbd5e1',
      'theme-from': '#ffffff',
      'theme-via': '#d1d5db',
      'theme-to': '#38bdf8',
      'theme-muted': '#cbd5e1',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    icon: '🌅',
    gradient: 'linear-gradient(to bottom, #1a0b16 0%, #2d1124 50%, #451a37 100%)',
    colors: {
      'space-950': '#10050d',
      'space-900': '#1a0b16',
      'space-800': '#2d1124',
      'space-700': '#451a37',
      'nebula-purple': '#d97706',
      'nebula-blue': '#f43f5e',
      'nebula-pink': '#eab308',
      'theme-from': '#f97316',
      'theme-via': '#ec4899',
      'theme-to': '#7c3aed',
      'theme-muted': '#fda4af',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    icon: '🌊',
    gradient: 'linear-gradient(to bottom, #021626 0%, #062a47 60%, #0b426e 100%)',
    colors: {
      'space-950': '#010d18',
      'space-900': '#021626',
      'space-800': '#062a47',
      'space-700': '#0b426e',
      'nebula-purple': '#0284c7',
      'nebula-blue': '#0d9488',
      'nebula-pink': '#22d3ee',
      'theme-from': '#14b8a6',
      'theme-via': '#06b6d4',
      'theme-to': '#2563eb',
      'theme-muted': '#a5f3fc',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    gradient: 'linear-gradient(to bottom, #04160e 0%, #082c1b 70%, #0f442c 100%)',
    colors: {
      'space-950': '#020d08',
      'space-900': '#04160e',
      'space-800': '#082c1b',
      'space-700': '#0f442c',
      'nebula-purple': '#16a34a',
      'nebula-blue': '#059669',
      'nebula-pink': '#84cc16',
      'theme-from': '#22c55e',
      'theme-via': '#84cc16',
      'theme-to': '#10b981',
      'theme-muted': '#a7f3d0',
    },
  },
  {
    id: 'sakura',
    name: 'Sakura',
    icon: '🌸',
    gradient: 'linear-gradient(to bottom, #1a0914 0%, #2d1123 50%, #451936 100%)',
    colors: {
      'space-950': '#0f050b',
      'space-900': '#1a0914',
      'space-800': '#2d1123',
      'space-700': '#451936',
      'nebula-purple': '#db2777',
      'nebula-blue': '#ec4899',
      'nebula-pink': '#f472b6',
      'theme-from': '#ec4899',
      'theme-via': '#f43f5e',
      'theme-to': '#8b5cf6',
      'theme-muted': '#fbcfe8',
    },
  },
  {
    id: 'nightsky',
    name: 'Night Sky',
    icon: '🌙',
    gradient: 'radial-gradient(circle at 75% 20%, rgba(241, 245, 249, 0.15) 0%, transparent 40%), linear-gradient(to bottom, #020817, #01040a)',
    colors: {
      'space-950': '#01040a',
      'space-900': '#020817',
      'space-800': '#0a122c',
      'space-700': '#142045',
      'nebula-purple': '#f1f5f9',
      'nebula-blue': '#38bdf8',
      'nebula-pink': '#64748b',
      'theme-from': '#cbd5e1',
      'theme-via': '#ffffff',
      'theme-to': '#3b82f6',
      'theme-muted': '#94a3b8',
    },
  },
  {
    id: 'aurora',
    name: 'Aurora',
    icon: '🌋',
    gradient: 'linear-gradient(to bottom, #030d22 0%, #081a3d 100%)',
    colors: {
      'space-950': '#01060f',
      'space-900': '#030d22',
      'space-800': '#081a3d',
      'space-700': '#112c5d',
      'nebula-purple': '#10b981',
      'nebula-blue': '#8b5cf6',
      'nebula-pink': '#06b6d4',
      'theme-from': '#10b981',
      'theme-via': '#06b6d4',
      'theme-to': '#8b5cf6',
      'theme-muted': '#a7f3d0',
    },
  },
];

export function ThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      return saved && THEME_CONFIGS.some((t) => t.id === saved) ? saved : 'space';
    } catch {
      return 'space';
    }
  });

  useEffect(() => {
    const config = THEME_CONFIGS.find((t) => t.id === activeTheme) || THEME_CONFIGS[0];
    
    // Set theme attributes on HTML root element
    document.documentElement.setAttribute('data-theme', activeTheme);
    
    // Dynamically inject CSS variables onto :root
    Object.entries(config.colors).forEach(([variable, value]) => {
      document.documentElement.style.setProperty(`--${variable}`, value);
    });

    try {
      localStorage.setItem('portfolio-theme', activeTheme);
    } catch (e) {
      console.warn('Failed to save theme to localStorage:', e);
    }
  }, [activeTheme]);

  const value = {
    theme: activeTheme,
    setTheme: setActiveTheme,
    configs: THEME_CONFIGS,
    currentConfig: THEME_CONFIGS.find((t) => t.id === activeTheme) || THEME_CONFIGS[0],
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
