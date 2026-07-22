import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

      <Box sx={{ display: 'block', width: '100%', textAlign: 'center' }}>
        {members.map((member) => (
          <Box
            key={member.id}
            component={RouterLink}
            to={`/members?member=${member.id}`}
            sx={{
              display: 'inline-block',
              mx: { xs: 1.5, md: 2.5 },
              mb: 2,
              verticalAlign: 'top',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <MemberAvatar member={member} size={88} />
            <Typography sx={{ color: 'text.secondary', fontSize: '0.78rem', mt: 1 }}>
              {member.stageName}
            </Typography>
          </Box>
        ))}
      </Box>
    </SectionContainer>
  );
}

export default MembersPreviewSection;
