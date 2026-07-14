import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SectionContainer from '../ui/section-container.jsx';
import GlowCard from '../ui/glow-card.jsx';
import CardContent from '@mui/material/CardContent';

const features = [
  { title: '주제 미정', desc: '어떤 이야기를 나눌 공간이 될지 아직 정하지 않았어요.' },
  { title: '기능 미정', desc: '좋아요·댓글 등 기본 기능만 먼저 만들어뒀어요.' },
  { title: '커뮤니티', desc: '주제가 정해지면 이 자리가 채워질 예정이에요.' },
];

function IntroSection() {
  return (
    <SectionContainer bgColor="background.paper" maxWidth="lg">
      <Typography
        variant="h4"
        sx={{ color: 'text.primary', fontWeight: 700, mb: { xs: 4, md: 6 }, fontSize: { xs: '1.5rem', md: '2rem' } }}
      >
        itsme는 이런 곳이에요
      </Typography>
      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid key={feature.title} size={{ xs: 12, md: 4 }}>
            <GlowCard>
              <CardContent sx={{ py: 4 }}>
                <Typography sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.1rem', mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {feature.desc}
                </Typography>
              </CardContent>
            </GlowCard>
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}

export default IntroSection;
