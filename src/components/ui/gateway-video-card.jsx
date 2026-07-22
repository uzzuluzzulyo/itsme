import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

/**
 * GatewayVideoCard 컴포넌트
 *
 * 입덕 영상 하나를 썸네일 카드로 보여주고, 누르면 카드 안에서 바로
 * 유튜브 임베드로 재생한다.
 *
 * Props:
 * @param {object} video - gateway-videos.js의 영상 객체 [Required]
 *
 * Example usage:
 * <GatewayVideoCard video={gatewayVideos[0]} />
 */
function GatewayVideoCard({ video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: video.featured ? '#FFC107' : 'divider',
        borderWidth: video.featured ? 2 : 1,
        bgcolor: 'background.paper',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
        boxShadow: video.featured ? '0 8px 24px rgba(255,193,7,0.25)' : 'none',
        '&:hover': { borderColor: video.featured ? '#FFC107' : 'primary.main', transform: 'translateY(-4px)' },
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
            icon={<StarRoundedIcon sx={{ color: '#000 !important', fontSize: '1rem' }} />}
            label="주인장 최애 직캠"
            size="small"
            sx={{ bgcolor: '#FFC107', color: '#000', fontWeight: 800, fontSize: '0.7rem', mb: 1 }}
          />
        )}
        <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.95rem', mb: 0.5 }}>
          {video.title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem', lineHeight: 1.6 }}>
          {video.blurb}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default GatewayVideoCard;
