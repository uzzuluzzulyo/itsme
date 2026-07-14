import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import GlowCard from '../components/ui/glow-card.jsx';
import { login } from '../lib/auth.js';

const ADMIN_ID = 'itsme';
const ADMIN_PASSWORD = 'itsme';

const inputSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'background.default',
    color: 'text.primary',
    '& fieldset': { borderColor: 'divider' },
    '&:hover fieldset': { borderColor: 'primary.main' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  },
  '& .MuiInputLabel-root': { color: 'text.secondary' },
};

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      login();
      navigate('/');
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="sm">
        <GlowCard>
          <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                color: 'text.primary',
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                textShadow: (theme) => `0 0 24px ${theme.palette.primary.main}55`,
              }}
            >
              로그인
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="아이디"
                value={id}
                onChange={(event) => setId(event.target.value)}
                sx={inputSx}
              />
              <TextField
                label="비밀번호"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                sx={inputSx}
              />
              {error && (
                <Typography sx={{ color: 'secondary.main', fontSize: '0.85rem' }}>
                  {error}
                </Typography>
              )}
              <Button
                onClick={handleLogin}
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontWeight: 700,
                  mt: 1,
                  boxShadow: (theme) => `0 0 24px ${theme.palette.primary.main}77`,
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                로그인
              </Button>
            </Box>
          </CardContent>
        </GlowCard>
      </Container>
    </Box>
  );
}

export default Login;
