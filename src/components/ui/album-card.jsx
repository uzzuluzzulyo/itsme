import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${year}.${month}.${day}`;
}

/**
 * AlbumCard 컴포넌트
 *
 * albums.js 앨범 하나를 카드로 보여준다. coverUrl이 없으면 컬러 플레이스홀더를 쓴다.
 *
 * Props:
 * @param {object} album - albums.js의 앨범 객체 [Required]
 * @param {function} onClick - 카드 클릭 콜백 [Required]
 *
 * Example usage:
 * <AlbumCard album={album} onClick={() => setSelected(album)} />
 */
function AlbumCard({ album, onClick }) {
  return (
    <Card
      variant="outlined"
      onClick={onClick}
      sx={{
        borderColor: 'divider',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
        '&:hover': { borderColor: album.color, transform: 'translateY(-4px)' },
      }}
    >
      <Box
        sx={{
          aspectRatio: '1 / 1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 2,
          background: album.coverUrl
            ? `url(${album.coverUrl}) center / cover`
            : `radial-gradient(circle at 30% 25%, ${album.color}55, ${album.color}11 70%)`,
        }}
      >
        {!album.coverUrl && (
          <Typography sx={{ color: album.color, fontWeight: 800, fontSize: '1.1rem', lineHeight: 1.3 }}>
            {album.title}
          </Typography>
        )}
      </Box>
      <CardContent sx={{ p: 2 }}>
        <Chip
          label={album.type}
          size="small"
          sx={{ bgcolor: `${album.color}22`, color: album.color, fontWeight: 700, mb: 1 }}
        />
        <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.95rem', mb: 0.5 }} noWrap>
          {album.title}
        </Typography>
        <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
          {formatDate(album.releaseDate)} · {album.language}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default AlbumCard;
