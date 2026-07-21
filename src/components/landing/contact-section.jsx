import Typography from '@mui/material/Typography';
import SectionContainer from '../ui/section-container.jsx';
import ContactInfoCard from './contact-info-card.jsx';
import Guestbook from './guestbook.jsx';

function ContactSection() {
  return (
    <SectionContainer bgColor="background.paper">
      <Typography
        variant="h4"
        sx={{
          color: 'text.primary',
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: '1.5rem', md: '2rem' },
          textShadow: (theme) => `0 0 24px ${theme.palette.primary.main}55`,
        }}
      >
        Contact
      </Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: { xs: '1rem', md: '1.2rem' }, lineHeight: 1.6, mb: 4 }}>
        운영자에게 하고 싶은 말이 있다면 이메일로 연락 주시거나, 아래에 메시지를 남겨주세요.
      </Typography>
      <ContactInfoCard />
      <Guestbook />
    </SectionContainer>
  );
}

export default ContactSection;
