import Box from '@mui/material/Box';
import HeroSection from '../components/landing/hero-section.jsx';
import MembersPreviewSection from '../components/landing/members-preview-section.jsx';
import ContactSection from '../components/landing/contact-section.jsx';

function Home() {
  return (
    <Box>
      <HeroSection />
      <MembersPreviewSection />
      <ContactSection />
    </Box>
  );
}

export default Home;
