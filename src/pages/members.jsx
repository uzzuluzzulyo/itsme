import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import GlowCard from '../components/ui/glow-card.jsx';
import MemberAvatar from '../components/ui/member-avatar.jsx';
import MemberDetailDialog from '../components/ui/member-detail-dialog.jsx';
import LightRaysBackground from '../components/ui/light-rays-background.jsx';
import { members } from '../utils/members.js';
import groupPhoto from '../assets/members/group.jpg';

function formatBirthDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${year}.${month}.${day}`;
}

function Members() {
  const [selected, setSelected] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const memberId = searchParams.get('member');
    if (!memberId) return;
    const member = members.find((item) => item.id === memberId);
    if (member) setSelected(member);
  }, [searchParams]);

  return (
    <Box sx={{ width: '100%', pb: { xs: 6, md: 10 }, position: 'relative', overflow: 'hidden' }}>
      <LightRaysBackground beamCount={0} />
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          zIndex: 1,
          aspectRatio: { xs: '3 / 2', md: '3 / 1' },
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={groupPhoto}
          alt="NCT WISH"
          sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(7,9,15,0.1) 0%, rgba(7,9,15,0.92) 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            pb: { xs: 3, md: 5 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: { xs: '1.75rem', md: '2.75rem' },
              textShadow: '0 0 30px rgba(79,216,176,0.6)',
              letterSpacing: '0.05em',
            }}
          >
            NCT WISH
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, position: 'relative', zIndex: 1 }}>
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          TO THE WORLD, 여긴 엔시티! NCT WISH입니다.
        </Typography>

        <Grid container spacing={{ xs: 2.5, md: 3.5 }}>
          {members.map((member) => (
            <Grid key={member.id} size={{ xs: 6, sm: 4, md: 3 }}>
              <GlowCard sx={{ height: '100%', cursor: 'pointer' }}>
                <CardContent
                  onClick={() => setSelected(member)}
                  sx={{ p: { xs: 2, md: 2.25 }, textAlign: 'center' }}
                >
                  <MemberAvatar member={member} size={56} />
                  <Typography sx={{ color: 'text.primary', fontWeight: 800, fontSize: '1rem', mt: 1.5 }}>
                    {member.stageName}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.7rem', mb: 1.5 }}>
                    {member.stageNameEn} · {member.realName}
                  </Typography>

                  <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap justifyContent="center" sx={{ mb: 1.5 }}>
                    <Chip
                      label={member.position}
                      size="small"
                      sx={{ bgcolor: `${member.color}22`, color: member.color, fontWeight: 700, fontSize: '0.68rem', height: 22 }}
                    />
                    <Chip
                      label={member.nationality}
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '0.68rem', height: 22 }}
                    />
                  </Stack>

                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.78rem',
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {member.bio}
                  </Typography>
                </CardContent>
              </GlowCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <MemberDetailDialog member={selected} onClose={() => setSelected(null)} />
    </Box>
  );
}

export default Members;
