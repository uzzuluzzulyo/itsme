import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import GlowCard from '../components/ui/glow-card.jsx';

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
              <TextField label="이메일" type="email" sx={inputSx} />
              <TextField label="비밀번호" type="password" sx={inputSx} />
              <Button
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
