import { useMediaQuery } from '@material-ui/core';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

interface ColorScheme {
  scheme: 'light' | 'dark';
  toggle: () => void;
}

const ColorSchemeContext = createContext(null as unknown as ColorScheme);

export function ColorSchemeProvider(props): JSX.Element {
  const systemPrefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const [prefersDarkMode, setPrefersDarkMode] = useLocalStorage('prefersDarkMode', systemPrefersDarkMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      setPrefersDarkMode(systemPrefersDarkMode);
    }
  }, [systemPrefersDarkMode]);

  useEffect(() => setMounted(true), []);

  const toggle = () => {
    setPrefersDarkMode((toggle) => !toggle);
  };

  const value = useMemo<ColorScheme>(() => ({
    scheme: prefersDarkMode ? 'dark' : 'light',
    toggle,
  }), [prefersDarkMode]);

  return <ColorSchemeContext.Provider value={value} {...props} />;
}

export function useColorScheme(): ['light' | 'dark', () => void] {
  const context = useContext(ColorSchemeContext);

  if (!context) {
    throw new Error('useColorScheme must be inside of a ColorSchemeProvider component');
  }

  return [context.scheme, context.toggle];
}
