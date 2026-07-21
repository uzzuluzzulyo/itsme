import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import GlowCard from '../components/ui/glow-card.jsx';

function About() {
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
        <GlowCard alwaysGlow>
          <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                color: 'text.primary',
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                textShadow: (theme) => `0 0 24px ${theme.palette.primary.main}55`,
              }}
            >
              About
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: { xs: '1rem', md: '1.2rem' }, lineHeight: 1.6 }}>
              Our Wishh는 NCT WISH를 응원하는 팬들이 자유롭게 소식을 나누고 이야기할 수 있는
              비공식 팬 커뮤니티입니다. 멤버 소개부터 자유게시판, 굿즈거래, 팬아트까지
              위시들과 함께 채워가요.
            </Typography>
          </CardContent>
        </GlowCard>
      </Container>
    </Box>
  );
}

export default About;
