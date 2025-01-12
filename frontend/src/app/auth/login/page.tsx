'use client';

import {
  Key,
  LoginRounded,
  Person,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

import {
  Container,
  Button,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  useMediaQuery,
} from '@mui/material';

import Image from 'next/image';
import Logo from '@/logo.png';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState({ error: false, message: '' });

  const handleClickVisibility = () => {
    setPasswordVisibility((prevState) => !prevState);
  };

  const handleOnChange = (target: any) => {
    setLoginError({ ...loginError, error: false });

    if (target.id === 'username') {
      setUsername(target.value);
      return 0;
    }

    setPassword(target.value);
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (username.length === 0 || password.length === 0) return -1;

    const response = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (response?.error) {
      setLoginError({ error: true, message: 'Invalid credentials' });
      return -1;
    }

    router.push('/');
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
        height: '100vh',
        color: 'primary.main',
      }}
      disableGutters
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexGrow: '1',
          bgcolor: 'background.paper',
          height: '100vh',
          paddingTop: '3ch',
          paddingBottom: '3ch',
        }}
      >
        <Box sx={{ alignSelf: 'flex-start', paddingLeft: '2ch' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Chrono Flow Project
          </Typography>
        </Box>
        <Box>
          <Image src={Logo} alt="test" width={450} />
        </Box>
        <Box sx={{ alignSelf: 'flex-start', paddingLeft: '2ch' }}>
          <Typography variant="h5">
            Welcome to the Chrono task manager
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Start managing your tasks faster and better
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: '3',
          height: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Box
          component="form"
          onSubmit={handleOnSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h4">Welcome back!</Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
            Start managing your tasks faster and better
          </Typography>
          <TextField
            required
            id="username"
            error={loginError.error}
            onChange={({ target }) => handleOnChange(target)}
            type="text"
            label="Username"
            variant="standard"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            required
            id="password"
            error={loginError.error}
            onChange={({ target }) => handleOnChange(target)}
            type={passwordVisibility ? 'password' : 'text'}
            label="Password"
            variant="standard"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Key sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickVisibility}>
                      {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {loginError.error && (
            <Alert severity="error">{loginError.message}</Alert>
          )}
          <Button type="submit" variant="contained">
            <LoginRounded fontSize="small" sx={{ marginRight: 1 }} />
            Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
