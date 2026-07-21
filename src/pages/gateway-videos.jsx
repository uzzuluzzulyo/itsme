import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import GatewayVideoCard from '../components/ui/gateway-video-card.jsx';
import { gatewayVideos } from '../utils/gateway-videos.js';

function GatewayVideos() {
  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 8 }, px: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{ color: 'text.primary', fontWeight: 800, mb: 1, textAlign: 'center', fontSize: { xs: '1.6rem', md: '2.1rem' } }}
        >
          위시 입덕 영상
        </Typography>
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          아직 위시가 낯설다면, 여기부터 보세요 · 카드를 누르면 바로 재생돼요
        </Typography>

        <Grid container spacing={2.5}>
          {gatewayVideos.map((video) => (
            <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <GatewayVideoCard video={video} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default GatewayVideos;
