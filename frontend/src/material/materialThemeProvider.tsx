'use client';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useAppSelector } from '@/redux/hooks';

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
      paper: '#121212',
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
      paper: '#f4f4f5',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
    divider: '#e0e0e0',
  },
});

export default function MaterialThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useAppSelector((state) => state.theme.value);

  return (
    <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
