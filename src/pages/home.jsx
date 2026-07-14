import Box from '@mui/material/Box';
import HeroSection from '../components/landing/hero-section.jsx';
import IntroSection from '../components/landing/intro-section.jsx';
import PostPreviewSection from '../components/landing/post-preview-section.jsx';

function Home() {
  return (
    <Box>
      <HeroSection />
      <IntroSection />
      <PostPreviewSection />
    </Box>
  );
}

export default Home;
