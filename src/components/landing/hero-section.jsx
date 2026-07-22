import { useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import Container from '@mui/material/Container';

function HeroSection() {
  const primaryGlowRef = useRef(null);
  const secondaryGlowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frameId = null;

    function updateParallax() {
      frameId = null;
      const y = window.scrollY;
      if (primaryGlowRef.current) primaryGlowRef.current.style.transform = `translateY(${y * 0.15}px)`;
      if (secondaryGlowRef.current) secondaryGlowRef.current.style.transform = `translateY(${y * 0.3}px)`;
    }

    function handleScroll() {
      if (frameId === null) frameId = requestAnimationFrame(updateParallax);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

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
      }}
    >
      <Box
        ref={primaryGlowRef}
        aria-hidden
        sx={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          width: { xs: 420, md: 700 },
          height: { xs: 300, md: 460 },
          ml: { xs: -210, md: -350 },
          borderRadius: '50%',
          background: (theme) => `radial-gradient(ellipse, ${theme.palette.primary.dark}4D 0%, transparent 70%)`,
          filter: 'blur(10px)',
        }}
      />
      <Box
        ref={secondaryGlowRef}
        aria-hidden
        sx={{
          position: 'absolute',
          bottom: '-15%',
          right: '2%',
          width: { xs: 220, md: 340 },
          height: { xs: 220, md: 340 },
          borderRadius: '50%',
          background: (theme) => `radial-gradient(circle, ${theme.palette.secondary.dark}3D 0%, transparent 70%)`,
          filter: 'blur(10px)',
        }}
      />

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
