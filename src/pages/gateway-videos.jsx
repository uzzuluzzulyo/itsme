import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import GatewayVideoCard from '../components/ui/gateway-video-card.jsx';
import MemberAvatar from '../components/ui/member-avatar.jsx';
import LightRaysBackground from '../components/ui/light-rays-background.jsx';
import { gatewayVideos } from '../utils/gateway-videos.js';
import { members } from '../utils/members.js';

function GatewayVideos() {
  const [searchParams] = useSearchParams();
  const memberId = searchParams.get('member');
  const member = memberId ? members.find((item) => item.id === memberId) : null;

  const videos = (member
    ? gatewayVideos.filter((video) => video.memberId === member.id)
    : gatewayVideos.filter((video) => !video.memberId)
  ).slice().sort((a, b) => (b.featured === true) - (a.featured === true));

  const stageVideos = videos.filter((video) => video.category === '무대');
  const otherVideos = videos.filter((video) => video.category !== '무대');

  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 8 }, px: { xs: 2, md: 3 }, position: 'relative', overflow: 'hidden', bgcolor: '#000000' }}>
      <LightRaysBackground beamCount={0} />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {member ? (
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <MemberAvatar member={member} size={72} />
            <Typography
              variant="h4"
              sx={{ color: 'text.primary', fontWeight: 800, mt: 1.5, mb: 0.5, fontSize: { xs: '1.5rem', md: '2rem' } }}
            >
              {member.stageName} 입덕 영상
            </Typography>
            {member.gatewayBlurb && (
              <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', mb: 1.5 }}>
                {member.gatewayBlurb}
              </Typography>
            )}
            <Chip
              label="전체 입덕 영상 보기"
              component={RouterLink}
              to="/gateway"
              clickable
              size="small"
              sx={{ mt: 1, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', color: 'text.secondary' }}
            />
          </Box>
        ) : (
          <>
            <Typography
              variant="h4"
              sx={{ color: 'text.primary', fontWeight: 800, mb: 1, textAlign: 'center', fontSize: { xs: '1.6rem', md: '2.1rem' } }}
            >
              위시 입덕 영상
            </Typography>
            <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: { xs: 3, md: 4 } }}>
              아직 위시가 낯설다면, 여기부터 보세요 · 카드를 누르면 바로 재생돼요
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: { xs: 2, md: 3 }, mb: { xs: 5, md: 6 } }}>
              {members.map((item) => (
                <Box
                  key={item.id}
                  component={RouterLink}
                  to={`/gateway?member=${item.id}`}
                  sx={{
                    textDecoration: 'none',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.15s ease',
                    '&:hover': { transform: 'translateY(-3px)' },
                  }}
                >
                  <MemberAvatar member={item} size={64} />
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem', mt: 0.5 }}>
                    {item.stageName}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}

        {videos.length === 0 ? (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>
            아직 {member?.stageName ?? ''} 전용 입덕 영상이 준비되지 않았어요. 곧 채워질 예정이에요!
          </Typography>
        ) : (
          <>
            {stageVideos.length > 0 && (
              <Box sx={{ mb: { xs: 4, md: 5 }, pb: { xs: 4, md: 5 }, borderBottom: otherVideos.length > 0 ? '2px solid' : 'none', borderColor: 'divider' }}>
                <Typography sx={{ color: 'text.primary', fontWeight: 800, fontSize: '1.05rem', mb: 2 }}>
                  무대 영상
                </Typography>
                <Grid container spacing={2.5}>
                  {stageVideos.map((video) => (
                    <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4 }}>
                      <GatewayVideoCard video={video} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {otherVideos.length > 0 && (
              <Box>
                <Typography sx={{ color: 'text.primary', fontWeight: 800, fontSize: '1.05rem', mb: 2 }}>
                  예능·입덕 영상
                </Typography>
                <Grid container spacing={2.5}>
                  {otherVideos.map((video) => (
                    <Grid key={video.id} size={{ xs: 12, sm: 6, md: 4 }}>
                      <GatewayVideoCard video={video} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default GatewayVideos;
