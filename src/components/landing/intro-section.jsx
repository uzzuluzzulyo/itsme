import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SectionContainer from '../ui/section-container.jsx';
import GlowCard from '../ui/glow-card.jsx';
import CardContent from '@mui/material/CardContent';

const features = [
  { title: '리뷰 공유', desc: '신제품 개봉기부터 장기 사용 후기까지 자유롭게 공유해요.' },
  { title: '스펙 토론', desc: '스펙 비교와 구매 상담을 함께 나누는 공간이에요.' },
  { title: '커뮤니티', desc: '좋아요와 댓글로 취향이 비슷한 사람들과 소통해요.' },
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
