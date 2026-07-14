import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import GlowCard from '../components/ui/glow-card.jsx';
import { projects } from '../utils/projects.js';

function Posts() {
  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 8 }, px: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{ color: 'text.primary', fontWeight: 700, mb: { xs: 3, md: 5 }, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
        >
          Projects
        </Typography>

        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid key={project.id} size={{ xs: 12, md: 6 }}>
              <GlowCard sx={{ height: '100%', textAlign: 'left' }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '1.3rem', mb: 1 }}>
                    {project.title}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem', lineHeight: 1.6, mb: 2 }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {project.stack.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: 'background.default',
                          color: 'primary.main',
                          border: '1px solid',
                          borderColor: 'primary.dark',
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Box>
                  <Button
                    component={project.link ? 'a' : 'button'}
                    href={project.link ?? undefined}
                    target={project.link ? '_blank' : undefined}
                    rel={project.link ? 'noopener noreferrer' : undefined}
                    disabled={!project.link}
                    variant="outlined"
                    sx={{
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      borderRadius: 2,
                    }}
                  >
                    {project.link ? '보러가기' : '비공개 저장소'}
                  </Button>
                </CardContent>
              </GlowCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Posts;
