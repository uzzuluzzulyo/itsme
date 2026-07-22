import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AlbumCard from '../components/ui/album-card.jsx';
import AlbumDetailDialog from '../components/ui/album-detail-dialog.jsx';
import StarfieldBackground from '../components/ui/starfield-background.jsx';
import { albums } from '../utils/albums.js';

const sortedAlbums = [...albums].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

function Discography() {
  const [selected, setSelected] = useState(null);

  return (
    <Box sx={{ width: '100%', position: 'relative', py: { xs: 4, md: 8 }, px: { xs: 2, md: 3 }, overflow: 'hidden' }}>
      <StarfieldBackground />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h4"
          sx={{ color: 'text.primary', fontWeight: 800, mb: 1, textAlign: 'center', fontSize: { xs: '1.6rem', md: '2.1rem' } }}
        >
          Discography
        </Typography>
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          데뷔부터 지금까지, NCT WISH의 앨범을 모두 모았어요 · 카드를 누르면 수록곡을 볼 수 있어요
        </Typography>

        <Grid container spacing={2.5}>
          {sortedAlbums.map((album) => (
            <Grid key={album.id} size={{ xs: 6, sm: 6, md: 4 }}>
              <AlbumCard album={album} onClick={() => setSelected(album)} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <AlbumDetailDialog album={selected} onClose={() => setSelected(null)} />
    </Box>
  );
}

export default Discography;
