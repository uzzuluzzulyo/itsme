import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${year}.${month}.${day}`;
}

/**
 * AlbumDetailDialog 컴포넌트
 *
 * 앨범 카드를 눌렀을 때 컨셉 소개와 수록곡 목록을 보여주는 다이얼로그.
 * 각 수록곡을 누르면 유튜브 공식 영상(뮤직비디오 또는 Official Audio)이 인라인으로
 * 재생된다. 확인된 영상이 없는 곡은 유튜브 검색 결과를 새 탭으로 연다.
 *
 * Props:
 * @param {object} album - albums.js의 앨범 객체 [Required, null이면 렌더링 안 함]
 * @param {function} onClose - 닫기 콜백 [Required]
 *
 * Example usage:
 * <AlbumDetailDialog album={selected} onClose={() => setSelected(null)} />
 */
function AlbumDetailDialog({ album, onClose }) {
  const [nowPlayingId, setNowPlayingId] = useState(null);
  const [nowPlayingTitle, setNowPlayingTitle] = useState('');

  useEffect(() => {
    setNowPlayingId(null);
    setNowPlayingTitle('');
  }, [album?.id]);

  if (!album) return null;

  function handleTrackClick(track) {
    if (track.youtubeId) {
      setNowPlayingId(track.youtubeId);
      setNowPlayingTitle(track.title);
    } else {
      const query = encodeURIComponent(`NCT WISH ${track.title} official audio`);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank', 'noopener,noreferrer');
    }
  }

  return (
    <Dialog open={Boolean(album)} onClose={onClose} maxWidth="xs" fullWidth scroll="paper">
      <DialogContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 0.5 }}>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        {nowPlayingId ? (
          <Box sx={{ aspectRatio: '16 / 9', borderRadius: 2, overflow: 'hidden', mb: 1 }}>
            <Box
              component="iframe"
              src={`https://www.youtube.com/embed/${nowPlayingId}?autoplay=1`}
              title={nowPlayingTitle || album.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sx={{ width: '100%', height: '100%', border: 'none' }}
            />
          </Box>
        ) : (
          <Box
            onClick={() => album.youtubeId && handleTrackClick({ title: album.tracks[0]?.title, youtubeId: album.youtubeId })}
            sx={{
              aspectRatio: '1 / 1',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              position: 'relative',
              p: 2,
              mb: 1,
              cursor: album.youtubeId ? 'pointer' : 'default',
              background: album.coverUrl
                ? `url(${album.coverUrl}) center / cover`
                : `radial-gradient(circle at 30% 25%, ${album.color}55, ${album.color}11 70%)`,
            }}
          >
            {!album.coverUrl && (
              <Typography sx={{ color: album.color, fontWeight: 800, fontSize: '1.4rem' }}>{album.title}</Typography>
            )}
            {album.youtubeId && (
              <PlayCircleRoundedIcon
                sx={{
                  position: 'absolute',
                  fontSize: 56,
                  color: 'rgba(255,255,255,0.9)',
                  filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.4))',
                }}
              />
            )}
          </Box>
        )}
        {nowPlayingId && (
          <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem', mb: 1.5 }}>
            재생 중: {nowPlayingTitle}
          </Typography>
        )}

        <Typography sx={{ color: 'text.primary', fontWeight: 800, fontSize: '1.2rem', mb: 1 }}>
          {album.title}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          <Chip label={album.type} size="small" sx={{ bgcolor: `${album.color}22`, color: album.color, fontWeight: 700 }} />
          <Chip label={album.language} size="small" variant="outlined" sx={{ borderColor: 'divider', color: 'text.secondary' }} />
          <Chip label={formatDate(album.releaseDate)} size="small" variant="outlined" sx={{ borderColor: 'divider', color: 'text.secondary' }} />
        </Stack>

        <Typography sx={{ color: 'text.disabled', fontSize: '0.78rem', mb: 2 }}>{album.label}</Typography>

        <Typography sx={{ color: 'text.primary', fontSize: '0.9rem', lineHeight: 1.8, mb: 2.5 }}>
          {album.description}
        </Typography>

        <Divider sx={{ borderColor: 'divider', mb: 2 }} />

        <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.85rem', mb: 1 }}>
          수록곡 ({album.tracks.length}) · 눌러서 재생
        </Typography>
        <Stack spacing={0.25}>
          {album.tracks.map((track, index) => {
            const isPlaying = nowPlayingId && nowPlayingId === track.youtubeId;
            return (
              <Button
                key={track.title}
                onClick={() => handleTrackClick(track)}
                fullWidth
                sx={{
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  py: 0.75,
                  px: 1,
                  borderRadius: 1,
                  bgcolor: isPlaying ? `${album.color}18` : 'transparent',
                  '&:hover': { bgcolor: `${album.color}18` },
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '100%' }}>
                  <Typography sx={{ color: 'text.disabled', fontSize: '0.85rem', width: 20 }}>
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  {track.youtubeId ? (
                    <PlayCircleOutlineRoundedIcon sx={{ fontSize: 16, color: isPlaying ? album.color : 'text.disabled' }} />
                  ) : (
                    <OpenInNewRoundedIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
                  )}
                  <Typography
                    sx={{
                      color: isPlaying ? album.color : index === 0 ? 'text.primary' : 'text.secondary',
                      fontWeight: isPlaying || index === 0 ? 700 : 400,
                      fontSize: '0.85rem',
                      textTransform: 'none',
                      flexGrow: 1,
                    }}
                  >
                    {track.title}
                  </Typography>
                  {index === 0 && (
                    <Chip label="타이틀" size="small" sx={{ bgcolor: `${album.color}22`, color: album.color, height: 18, fontSize: '0.65rem' }} />
                  )}
                </Stack>
              </Button>
            );
          })}
        </Stack>

        <Typography sx={{ color: 'text.disabled', fontSize: '0.7rem', mt: 2.5 }}>
          정보 출처: 위키백과, kprofiles.com 등 공개 정보를 종합 정리했습니다. 재생은 SM Entertainment · avex trax 공식 유튜브 채널 영상을 임베드해서 보여줘요. 공식 영상이 확인되지 않은 곡은 유튜브 검색 결과로 연결돼요.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default AlbumDetailDialog;
