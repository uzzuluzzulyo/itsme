import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import GlowCard from '../components/ui/glow-card.jsx';
import { supabase } from '../lib/supabase.js';
import { login } from '../lib/auth.js';

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

function Signup() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSignup() {
    setError('');

    if (!nickname || !email || !password) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setSubmitting(true);

    const { data: existing } = await supabase
      .from('itsme_users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existing) {
      setError('이미 사용 중인 이메일입니다.');
      setSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('itsme_users')
      .insert({ nickname, email, password });

    setSubmitting(false);

    if (insertError) {
      setError('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    login();
    navigate('/');
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
              회원가입
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="닉네임"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                sx={inputSx}
              />
              <TextField
                label="이메일"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                sx={inputSx}
              />
              <TextField
                label="비밀번호"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                sx={inputSx}
              />
              <TextField
                label="비밀번호 확인"
                type="password"
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                sx={inputSx}
              />
              {error && (
                <Typography sx={{ color: 'secondary.main', fontSize: '0.85rem' }}>
                  {error}
                </Typography>
              )}
              <Button
                onClick={handleSignup}
                disabled={submitting}
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
                {submitting ? '가입 중...' : '회원가입'}
              </Button>
              <Typography
                component={NavLink}
                to="/login"
                sx={{ color: 'text.secondary', fontSize: '0.85rem', textDecoration: 'none', mt: 1 }}
              >
                이미 계정이 있으신가요? 로그인
              </Typography>
            </Box>
          </CardContent>
        </GlowCard>
      </Container>
    </Box>
  );
}

export default Signup;
