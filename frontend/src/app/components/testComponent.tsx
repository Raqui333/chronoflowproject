'use client';

import { decrement, increment } from '@/redux/features/counter/counterSlice';
import { setTheme } from '@/redux/features/theme/themeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import {
  Container,
  Button,
  Typography,
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  CircularProgress,
} from '@mui/material';

import { LogoutRounded, LoginRounded } from '@mui/icons-material';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function TestComponent() {
  const { data: session, status } = useSession();

  console.log(session);

  const count = useAppSelector((state) => state.counter.value);
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

  if (status === 'loading') {
    return (
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.papel',
          height: '100vh',
          color: 'primary.main',
          gap: 2,
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.papel',
        height: '100vh',
        color: 'primary.main',
        gap: 2,
      }}
    >
      {!session ? (
        <>
          <Typography variant="h4">Not signed in</Typography>
          <Button variant="contained" onClick={() => signIn()}>
            <LoginRounded fontSize="small" sx={{ marginRight: 1 }} />
            Sign in
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h3">{`Hello ${session.user.username}`}</Typography>
          <Typography variant="h4">{count}</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Button variant="contained" onClick={() => dispatch(increment())}>
              INCREMENT
            </Button>
            <Button variant="contained" onClick={() => dispatch(decrement())}>
              DECREMENT
            </Button>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <FormControl>
              <RadioGroup
                value={theme}
                onChange={(event) =>
                  dispatch(setTheme(event.target.value as 'dark' | 'light'))
                }
                row
              >
                <FormControlLabel
                  value="dark"
                  control={<Radio />}
                  label="Dark"
                />
                <FormControlLabel
                  value="light"
                  control={<Radio />}
                  label="Light"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Button variant="contained" onClick={() => signOut()}>
            <LogoutRounded fontSize="small" sx={{ marginRight: 1 }} />
            Sign Out
          </Button>
        </>
      )}
    </Container>
  );
}
