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
          itsme
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.25rem' },
            lineHeight: 1.6,
            mb: 4,
          }}
        >
          어떤 주제로 채울지는 아직 고민 중이에요. 어둠 속에서 은은하게 빛나는,
          깔끔하고 모던한 커뮤니티를 먼저 준비하고 있습니다.
        </Typography>
        <Button
          component={NavLink}
          to="/posts"
          variant="contained"
          size="large"
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 700,
            px: 4,
            py: 1.2,
            borderRadius: 2,
            boxShadow: (theme) => `0 0 28px ${theme.palette.primary.main}88`,
            '&:hover': {
              bgcolor: 'primary.dark',
              boxShadow: (theme) => `0 0 40px ${theme.palette.primary.main}`,
            },
          }}
        >
          게시물 둘러보기
        </Button>
      </Container>
    </Box>
  );
}

export default HeroSection;
