import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GlowCard from '../ui/glow-card.jsx';
import { supabase } from '../../lib/supabase.js';

const inputSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'background.default',
    color: 'text.primary',
    '& fieldset': { borderColor: 'divider' },
    '&:hover fieldset': { borderColor: 'primary.main' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  },
  '& .MuiInputLabel-root': { color: 'text.secondary' },
};

function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (fetchError) {
      setError('방명록을 불러오지 못했습니다.');
    } else {
      setEntries(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setSubmitting(true);
    setError('');

    const { error: insertError } = await supabase
      .from('guestbook')
      .insert({ name: name.trim(), message: message.trim() });

    if (insertError) {
      setError('메시지 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } else {
      setName('');
      setMessage('');
      await fetchEntries();
    }
    setSubmitting(false);
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'left' }}>
      <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 700, mb: 3, textAlign: 'center' }}>
        방명록
      </Typography>

      <GlowCard sx={{ p: { xs: 2, md: 3 }, mb: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="이름"
              value={name}
              onChange={(event) => setName(event.target.value)}
              inputProps={{ maxLength: 30 }}
              required
              fullWidth
              size="small"
              sx={inputSx}
            />
            <TextField
              label="메시지"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              inputProps={{ maxLength: 300 }}
              required
              fullWidth
              multiline
              minRows={3}
              sx={inputSx}
            />
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                alignSelf: { xs: 'stretch', md: 'flex-end' },
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 700,
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            >
              {submitting ? '등록 중...' : '남기기'}
            </Button>
          </Stack>
        </Box>
      </GlowCard>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color: 'primary.main' }} />
        </Box>
      ) : entries.length === 0 ? (
        <Typography sx={{ color: 'text.secondary', textAlign: 'center' }}>
          아직 등록된 메시지가 없습니다. 첫 메시지를 남겨보세요!
        </Typography>
      ) : (
        <Stack spacing={2}>
          {entries.map((entry) => (
            <GlowCard key={entry.id} sx={{ p: 2 }}>
              <CardContent sx={{ p: '8px !important' }}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: 1 }}>
                  <Typography sx={{ color: 'text.primary', fontWeight: 700 }}>{entry.name}</Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                    {new Date(entry.created_at).toLocaleString('ko-KR', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </Typography>
                </Stack>
                <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>
                  {entry.message}
                </Typography>
              </CardContent>
            </GlowCard>
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default Guestbook;
