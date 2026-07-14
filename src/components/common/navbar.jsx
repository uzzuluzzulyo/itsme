import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'HOME', path: '/', end: true },
  { label: 'ABOUT ME', path: '/about' },
  { label: 'PROJECTS', path: '/posts' },
];

function Navbar() {
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
          itsme
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, md: 3 } }}>
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
                fontSize: { xs: '0.8rem', md: '0.95rem' },
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
                    boxShadow: (theme) => `0 0 10px ${theme.palette.primary.main}`,
                  },
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          <Button
            component={NavLink}
            to="/posts"
            variant="contained"
            size="small"
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 700,
              borderRadius: 2,
              boxShadow: (theme) => `0 0 16px ${theme.palette.primary.main}66`,
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            글쓰기
          </Button>
          <Button
            component={NavLink}
            to="/login"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: { xs: '0.8rem', md: '0.95rem' },
              '&.active': { color: 'primary.main' },
            }}
          >
            로그인
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
