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
} from '@mui/material';

export default function TestComponent() {
  const count = useAppSelector((state) => state.counter.value);
  const theme = useAppSelector((state) => state.theme.value);
  const dispatch = useAppDispatch();

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
      <Typography variant="h3">Hello World</Typography>
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
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            <FormControlLabel value="light" control={<Radio />} label="Light" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Container>
  );
}
