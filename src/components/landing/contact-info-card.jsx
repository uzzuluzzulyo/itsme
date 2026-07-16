import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import GlowCard from '../ui/glow-card.jsx';

function ContactInfoCard() {
  return (
    <GlowCard sx={{ display: 'inline-block', mb: 4 }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <EmailIcon sx={{ color: 'primary.contrastText' }} />
          </Box>
          <Box sx={{ textAlign: 'left' }}>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>Email</Typography>
            <Typography
              component="a"
              href="mailto:uzzuluzzulyo0@gmail.com"
              sx={{ color: 'text.primary', fontWeight: 700, textDecoration: 'none' }}
            >
              uzzuluzzulyo0@gmail.com
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </GlowCard>
  );
}

export default ContactInfoCard;
