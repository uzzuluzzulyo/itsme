import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import Container from '@mui/material/Container';

function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 8, md: 14 },
        px: { xs: 2, md: 3 },
        overflow: 'hidden',
        bgcolor: 'background.default',
        backgroundImage: (theme) =>
          `radial-gradient(ellipse 60% 50% at 50% 0%, ${theme.palette.primary.dark}33, transparent 70%),
           radial-gradient(ellipse 40% 40% at 85% 90%, ${theme.palette.secondary.dark}22, transparent 70%)`,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            color: 'text.primary',
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '2rem', md: '3.25rem' },
            textShadow: (theme) => `0 0 40px ${theme.palette.primary.main}55`,
          }}
        >
          Our Wishh
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' },
            lineHeight: 1.6,
            mb: 4,
          }}
        >
          NCT WISH 위즈니 집합소. 멤버 소식을 나누고,
          위시들과 자유롭게 이야기해요.
        </Typography>
        <Button
          component={NavLink}
          to="/board"
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 700,
            px: 4,
            py: 1.2,
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          게시판 가기
        </Button>
      </Container>
    </Box>
  );
}

export default HeroSection;
