import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SectionContainer from '../ui/section-container.jsx';
import MemberAvatar from '../ui/member-avatar.jsx';
import { members } from '../../utils/members.js';

function MembersPreviewSection() {
  return (
    <SectionContainer bgColor="background.default">
      <Typography
        variant="h4"
        sx={{
          color: 'text.primary',
          fontWeight: 700,
          mb: 3,
          fontSize: { xs: '1.5rem', md: '2rem' },
          textShadow: (theme) => `0 0 24px ${theme.palette.primary.main}55`,
        }}
      >
        Members
      </Typography>

      <Stack direction="row" spacing={{ xs: 1.5, md: 3 }} justifyContent="center" flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
        {members.map((member) => (
          <Box key={member.id} sx={{ textAlign: 'center' }}>
            <MemberAvatar member={member} size={64} />
            <Typography sx={{ color: 'text.secondary', fontSize: '0.78rem', mt: 1 }}>
              {member.stageName}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Button
        component={NavLink}
        to="/members"
        variant="outlined"
        sx={{ color: 'primary.main', borderColor: 'primary.main', borderRadius: 2 }}
      >
        멤버 자세히 보기
      </Button>
    </SectionContainer>
  );
}

export default MembersPreviewSection;
