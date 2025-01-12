'use client';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setTheme } from '@/redux/features/theme/themeSlice';
import { useEffect, useState } from 'react';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      contrastText: '#000000',
    },
    secondary: {
      main: '#0070f3',
      contrastText: '#ffffff',
    },
    background: {
      default: '#000000',
      paper: '#232323',
    },
    text: {
      primary: '#ffffff',
      secondary: '#888888',
    },
    divider: '#333333',
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0070f3',
      contrastText: '#000000',
    },
    background: {
      default: '#ffffff',
      paper: '#f6f7f9',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
    divider: '#e0e0e0',
  },
});

export default function MaterialThemeProvider({
  initialTheme,
  children,
}: {
  initialTheme?: 'light' | 'dark';
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState(initialTheme);
  const client_theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // only run at first reload, sync the redux theme with cookies theme
    dispatch(setTheme(theme as 'dark' | 'light'));
  }, []);

  useEffect(() => {
    // run every time client_theme (redux) changes
    if (client_theme !== theme) setThemeState(client_theme);
  }, [client_theme]);

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
