import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'HOME', path: '/', end: true },
  { label: 'MEMBERS', path: '/members' },
  { label: 'ALBUM', path: '/discography' },
  { label: '입덕영상', path: '/gateway' },
  { label: 'BOARD', path: '/board' },
  { label: 'ABOUT', path: '/about' },
];

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1, px: { xs: 2, md: 4 }, gap: 2 }}>
        <Typography
          component={NavLink}
          to="/"
          sx={{
            fontWeight: 700,
            fontSize: '1.3rem',
            letterSpacing: '0.02em',
            color: 'text.primary',
            textDecoration: 'none',
            textShadow: (theme) => `0 0 18px ${theme.palette.primary.main}66`,
          }}
        >
          Our Wishh
        </Typography>

        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={NavLink}
              to={item.path}
              end={item.end}
              sx={{
                position: 'relative',
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.95rem',
                letterSpacing: '0.04em',
                '&.active': {
                  color: 'primary.main',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: (theme) => `-${theme.spacing(1)}`,
                    height: '3px',
                    borderRadius: '2px',
                    backgroundColor: 'primary.main',
                  },
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          <Button
            component={NavLink}
            to="/login"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.95rem',
              '&.active': { color: 'primary.main' },
            }}
          >
            로그인
          </Button>
        </Box>

        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
        >
          <MenuRoundedIcon />
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240, bgcolor: 'background.paper', height: '100%', p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'text.secondary' }}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <Stack spacing={0.5}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                end={item.end}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  justifyContent: 'flex-start',
                  color: 'text.secondary',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  px: 1.5,
                  py: 1.25,
                  borderRadius: 1.5,
                  '&.active': { color: 'primary.main', bgcolor: `primary.main`, opacity: 1 },
                  '&.active, &.active:hover': { bgcolor: 'action.selected', color: 'primary.main' },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              component={NavLink}
              to="/login"
              onClick={() => setDrawerOpen(false)}
              sx={{
                justifyContent: 'flex-start',
                color: 'text.secondary',
                fontWeight: 600,
                fontSize: '0.95rem',
                px: 1.5,
                py: 1.25,
                borderRadius: 1.5,
                '&.active': { color: 'primary.main', bgcolor: 'action.selected' },
              }}
            >
              로그인
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
