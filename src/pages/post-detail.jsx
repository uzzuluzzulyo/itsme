import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GlowCard from '../components/ui/glow-card.jsx';
import { supabase } from '../lib/supabase.js';
import { formatDate } from '../utils/format-date.js';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [commentInput, setCommentInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPost() {
      const { data: postRow } = await supabase
        .from('itsme_posts')
        .select('id, title, content, image_url, created_at, itsme_categories(name), itsme_likes(count)')
        .eq('id', id)
        .single();

      if (postRow) {
        setPost({
          id: postRow.id,
          title: postRow.title,
          content: postRow.content,
          category: postRow.itsme_categories?.name ?? '기타',
          date: formatDate(postRow.created_at),
          thumbnail: postRow.image_url,
        });
        setLikeCount(postRow.itsme_likes?.[0]?.count ?? 0);
      }

      const { data: commentRows } = await supabase
        .from('itsme_comments')
        .select('id, content, created_at')
        .eq('post_id', id)
        .order('created_at', { ascending: true });
      setComments(commentRows ?? []);
      setLoading(false);
    }
    loadPost();
  }, [id]);

  async function handleLike() {
    setLikeCount((count) => count + 1);
    await supabase.from('itsme_likes').insert({ post_id: id });
  }

  async function handleCommentSubmit() {
    if (!commentInput.trim()) return;
    const { data, error } = await supabase
      .from('itsme_comments')
      .insert({ post_id: id, content: commentInput.trim() })
      .select('id, content, created_at')
      .single();
    if (!error && data) {
      setComments((prev) => [...prev, data]);
      setCommentInput('');
    }
  }

  if (loading) {
    return (
      <Box sx={{ width: '100%', py: 8, textAlign: 'center' }}>
        <Typography sx={{ color: 'text.secondary' }}>불러오는 중...</Typography>
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ width: '100%', py: 8, textAlign: 'center' }}>
        <Typography sx={{ color: 'text.secondary' }}>게시물을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 8 }, px: { xs: 2, md: 3 } }}>
      <Container maxWidth="md">
        <GlowCard sx={{ overflow: 'hidden' }}>
          <CardMedia
            component="img"
            image={post.thumbnail}
            alt={post.title}
            sx={{ height: { xs: 200, md: 320 }, objectFit: 'cover' }}
          />
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Chip
              label={post.category}
              size="small"
              sx={{
                mb: 2,
                bgcolor: 'background.default',
                color: 'primary.main',
                border: '1px solid',
                borderColor: 'primary.dark',
                fontWeight: 600,
              }}
            />
            <Typography
              variant="h4"
              sx={{ color: 'text.primary', fontWeight: 700, mb: 1, fontSize: { xs: '1.5rem', md: '2rem' } }}
            >
              {post.title}
            </Typography>
            <Typography sx={{ color: 'text.disabled', fontSize: '0.85rem', mb: 3 }}>
              {post.date}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '1rem', lineHeight: 1.8, mb: 3 }}>
              {post.content}
            </Typography>
            <Button
              onClick={handleLike}
              startIcon={<FavoriteBorderIcon />}
              sx={{
                color: 'primary.main',
                borderColor: 'primary.main',
                border: '1px solid',
                borderRadius: 2,
                px: 2,
                '&:hover': { boxShadow: (theme) => `0 0 16px ${theme.palette.primary.main}66` },
              }}
            >
              좋아요 {likeCount}
            </Button>
          </CardContent>
        </GlowCard>

        <Box sx={{ mt: 5 }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '1.2rem', mb: 2 }}>
            댓글 {comments.length}
          </Typography>
          <Divider sx={{ borderColor: 'divider', mb: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            {comments.length === 0 ? (
              <Typography sx={{ color: 'text.disabled', fontSize: '0.9rem' }}>
                아직 댓글이 없습니다. 첫 댓글을 남겨보세요.
              </Typography>
            ) : (
              comments.map((comment) => (
                <Box
                  key={comment.id}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.9rem' }}>
                      익명
                    </Typography>
                    <Typography sx={{ color: 'text.disabled', fontSize: '0.8rem' }}>
                      {formatDate(comment.created_at)}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                    {comment.content}
                  </Typography>
                </Box>
              ))
            )}
          </Box>

          <TextField
            fullWidth
            placeholder="댓글을 입력하세요"
            multiline
            minRows={2}
            value={commentInput}
            onChange={(event) => setCommentInput(event.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
                color: 'text.primary',
                '& fieldset': { borderColor: 'divider' },
                '&:hover fieldset': { borderColor: 'primary.main' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' },
              },
            }}
          />
          <Button
            onClick={handleCommentSubmit}
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 700,
              boxShadow: (theme) => `0 0 20px ${theme.palette.primary.main}66`,
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            댓글 등록
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default PostDetail;
