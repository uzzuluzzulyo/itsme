import { useRef } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { getAlbumThumbnail } from '../../utils/albums.js';

const CAN_TILT = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

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
  const thumbnail = getAlbumThumbnail(album);
  const cardRef = useRef(null);

  function handleMouseMove(event) {
    if (!CAN_TILT || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(900px) rotateX(${py * -8}deg) rotateY(${px * 8}deg) translateY(-4px)`;
  }

  function handleMouseLeave() {
    if (!cardRef.current) return;
    cardRef.current.style.transform = '';
  }

  return (
    <Card
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
        transition: 'border-color 0.2s ease, transform 0.15s ease-out',
        willChange: 'transform',
        '&:hover': { borderColor: album.color },
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
          background: thumbnail
            ? `url(${thumbnail}) center / cover`
            : `radial-gradient(circle at 30% 25%, ${album.color}55, ${album.color}11 70%)`,
        }}
      >
        {!thumbnail && (
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
