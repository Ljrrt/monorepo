import { ICONS, LocalStorage } from '@monorepo/common';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export const THEMES = ['light', 'cream', 'dark', 'aurora'] as const;

type Theme = typeof THEMES[number];

const LOCAL_STORAGE_KEY = 'theme';

interface ThemeContextType {
  theme:        Theme;
  toggleTheme:  () => void;
  setTheme:     (theme: Theme) => void;
  getThemeIcon: (theme: Theme) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProperties {
  children:      ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider(properties: ThemeProviderProperties) {
  const { children, defaultTheme = 'dark' } = properties;

  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const savedTheme = LocalStorage.loadValue<Theme>(LOCAL_STORAGE_KEY, defaultTheme);

    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    LocalStorage.setValue<Theme>(LOCAL_STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme(): void {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  }

  function setNewTheme(newTheme: Theme): void {
    setTheme(newTheme);
  }

  function getThemeIcon(theme: Theme): string {
    switch (theme) {
      case 'light':
        return ICONS.lightMode;
      case 'dark':
        return ICONS.darkMode;
      case 'cream':
        return ICONS.lightMode;
      case 'aurora':
        return ICONS.darkMode;
      default:
        return ICONS.lightMode;
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setNewTheme, getThemeIcon }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
