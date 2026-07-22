import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { members } from '../../utils/members.js';

const CAN_TILT = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

/**
 * GatewayVideoCard 컴포넌트
 *
 * 입덕 영상 하나를 썸네일 카드로 보여주고, 누르면 카드 안에서 바로
 * 유튜브 임베드로 재생한다. featured 영상은 해당 멤버 고유 색상으로 강조된다.
 *
 * Props:
 * @param {object} video - gateway-videos.js의 영상 객체 [Required]
 *
 * Example usage:
 * <GatewayVideoCard video={gatewayVideos[0]} />
 */
function GatewayVideoCard({ video }) {
  const [playing, setPlaying] = useState(false);
  const memberColor = members.find((item) => item.id === video.memberId)?.color;
  const featuredColor = memberColor ?? '#FFC107';
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
      sx={{
        borderColor: video.featured ? featuredColor : 'divider',
        borderWidth: video.featured ? 2 : 1,
        bgcolor: 'background.paper',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.2s ease, transform 0.15s ease-out',
        willChange: 'transform',
        boxShadow: video.featured ? `0 8px 24px ${featuredColor}40` : 'none',
        '&:hover': { borderColor: memberColor ?? 'primary.main' },
      }}
    >
      {playing ? (
        <Box sx={{ aspectRatio: '16 / 9' }}>
          <Box
            component="iframe"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{ width: '100%', height: '100%', border: 'none' }}
          />
        </Box>
      ) : (
        <Box
          onClick={() => setPlaying(true)}
          sx={{
            position: 'relative',
            aspectRatio: '16 / 9',
            cursor: 'pointer',
            backgroundImage: `url(https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0,0,0,0.25)',
            }}
          >
            <PlayCircleRoundedIcon
              sx={{ fontSize: 52, color: 'rgba(255,255,255,0.9)', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.4))' }}
            />
          </Box>
          {video.category && (
            <Chip
              label={video.category}
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                bgcolor: 'rgba(0,0,0,0.6)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.7rem',
                height: 22,
              }}
            />
          )}
        </Box>
      )}

      <CardContent sx={{ p: 2 }}>
        {video.featured && (
          <Chip
            icon={<StarRoundedIcon sx={{ color: '#fff !important', fontSize: '1rem' }} />}
            label="주인장 최애 직캠"
            size="small"
            sx={{ bgcolor: featuredColor, color: '#fff', fontWeight: 800, fontSize: '0.7rem', mb: 1 }}
          />
        )}
        <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.95rem' }}>
          {video.title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default GatewayVideoCard;
