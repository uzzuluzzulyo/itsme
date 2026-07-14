import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChatIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import EmailIcon from '@mui/icons-material/EmailOutlined';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        mt: 'auto',
        py: 4,
        px: { xs: 2, md: 4 },
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          textShadow: (theme) => `0 0 14px ${theme.palette.primary.main}44`,
        }}
      >
        itsme
      </Typography>
      <Typography sx={{ color: 'text.disabled', fontSize: '0.85rem' }}>
        © 2026 깡의 포트폴리오.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <GitHubIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <ChatIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
          <EmailIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Footer;
