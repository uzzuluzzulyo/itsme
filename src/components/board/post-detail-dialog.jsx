import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import MemberBadge from '../ui/member-badge.jsx';
import { supabase } from '../../lib/supabase.js';
import { getCurrentUserId } from '../../lib/auth.js';

/**
 * PostDetailDialog 컴포넌트
 *
 * 게시글 상세 내용, 댓글, 좋아요를 보여주는 다이얼로그. 작성자 본인일 때만
 * 수정/삭제 버튼이 노출된다.
 *
 * Props:
 * @param {object} post - 게시글 데이터(itsme_users, itsme_categories 임베드 포함) [Required]
 * @param {boolean} open - 다이얼로그 표시 여부 [Required]
 * @param {function} onClose - 닫기 콜백 [Required]
 * @param {function} onLikeChange - 좋아요 토글 후 목록 갱신을 위한 콜백 [Optional]
 * @param {function} onEdit - 수정 버튼 클릭 콜백. 게시글 객체를 인자로 받는다 [Optional]
 * @param {function} onDeleted - 삭제 성공 후 목록 갱신을 위한 콜백 [Optional]
 *
 * Example usage:
 * <PostDetailDialog post={post} open={open} onClose={() => setOpen(false)} onEdit={handleEdit} onDeleted={fetchPosts} />
 */
function PostDetailDialog({ post, open, onClose, onLikeChange, onEdit, onDeleted }) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const fetchComments = async (postId) => {
    const { data } = await supabase
      .from('itsme_comments')
      .select('*, itsme_users(nickname, favorite_member)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    setComments(data ?? []);
  };

  const fetchLikes = async (postId) => {
    const { data } = await supabase.from('itsme_likes').select('user_id').eq('post_id', postId);
    const rows = data ?? [];
    setLikeCount(rows.length);
    const userId = getCurrentUserId();
    setLiked(rows.some((row) => String(row.user_id) === String(userId)));
  };

  useEffect(() => {
    if (open && post) {
      fetchComments(post.id);
      fetchLikes(post.id);
      setCommentText('');
    }
  }, [open, post]);

  async function handleToggleLike() {
    const userId = getCurrentUserId();
    if (!userId || !post) return;

    if (liked) {
      await supabase.from('itsme_likes').delete().eq('post_id', post.id).eq('user_id', userId);
    } else {
      await supabase.from('itsme_likes').insert({ post_id: post.id, user_id: userId });
    }
    await fetchLikes(post.id);
    onLikeChange?.();
  }

  async function handleAddComment() {
    const userId = getCurrentUserId();
    const trimmed = commentText.trim();
    if (!userId || !trimmed || !post) return;

    setSubmitting(true);
    await supabase.from('itsme_comments').insert({ post_id: post.id, user_id: userId, content: trimmed });
    setCommentText('');
    setSubmitting(false);
    await fetchComments(post.id);
  }

  async function handleDelete() {
    if (!post) return;
    if (!window.confirm('이 글을 삭제할까요? 삭제하면 되돌릴 수 없어요.')) return;

    await supabase.from('itsme_posts').delete().eq('id', post.id);
    onDeleted?.();
    onClose();
  }

  if (!post) return null;

  const isAuthor = String(post.user_id) === String(getCurrentUserId());

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="paper">
      <DialogContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 0.5, mb: 1 }}>
          {isAuthor && (
            <>
              <IconButton onClick={() => onEdit?.(post)} size="small" sx={{ color: 'text.secondary' }}>
                <EditRoundedIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={handleDelete} size="small" sx={{ color: 'text.secondary' }}>
                <DeleteRoundedIcon fontSize="small" />
              </IconButton>
            </>
          )}
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
          {post.itsme_categories?.name && (
            <Chip
              label={post.itsme_categories.name}
              size="small"
              sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700 }}
            />
          )}
          <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
            {new Date(post.created_at).toLocaleString('ko-KR', { dateStyle: 'medium', timeStyle: 'short' })}
          </Typography>
        </Stack>

        <Typography sx={{ color: 'text.primary', fontWeight: 800, fontSize: '1.25rem', mb: 1 }}>
          {post.title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', fontWeight: 600 }}>
            {post.itsme_users?.nickname ?? '탈퇴한 사용자'}
          </Typography>
          <MemberBadge favoriteMember={post.itsme_users?.favorite_member} />
        </Stack>

        {post.image_url && (
          <Box
            component="img"
            src={post.image_url}
            alt=""
            sx={{ width: '100%', maxHeight: 360, objectFit: 'cover', borderRadius: 1, mb: 2 }}
          />
        )}

        <Typography sx={{ color: 'text.primary', fontSize: '0.95rem', lineHeight: 1.8, mb: 2, whiteSpace: 'pre-wrap' }}>
          {post.content}
        </Typography>

        <Button
          onClick={handleToggleLike}
          startIcon={liked ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
          sx={{ color: liked ? 'secondary.main' : 'text.secondary', fontWeight: 700, px: 0, mb: 2 }}
        >
          좋아요 {likeCount}
        </Button>

        <Divider sx={{ borderColor: 'divider', mb: 2 }} />

        <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.9rem', mb: 1.5 }}>
          댓글 {comments.length}
        </Typography>

        <Stack spacing={1.5} sx={{ mb: 2 }}>
          {comments.map((comment) => (
            <Box key={comment.id}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.82rem' }}>
                  {comment.itsme_users?.nickname ?? '탈퇴한 사용자'}
                </Typography>
                <MemberBadge favoriteMember={comment.itsme_users?.favorite_member} />
              </Stack>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mt: 0.25 }}>
                {comment.content}
              </Typography>
            </Box>
          ))}
          {comments.length === 0 && (
            <Typography sx={{ color: 'text.disabled', fontSize: '0.85rem' }}>
              아직 댓글이 없어요. 첫 댓글을 남겨보세요!
            </Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={1}>
          <TextField
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="댓글을 남겨보세요"
            fullWidth
            size="small"
          />
          <Button
            onClick={handleAddComment}
            disabled={submitting || !commentText.trim()}
            variant="contained"
            sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700, flexShrink: 0 }}
          >
            등록
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default PostDetailDialog;
