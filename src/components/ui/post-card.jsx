import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { NavLink } from 'react-router-dom';
import GlowCard from './glow-card.jsx';

/**
 * PostCard 컴포넌트
 *
 * Props:
 * @param {object} post - 게시물 데이터 [Required]
 * @param {number} post.id - 게시물 ID
 * @param {string} post.category - 카테고리
 * @param {string} post.title - 게시물 제목
 * @param {string} post.excerpt - 게시물 요약
 * @param {string} post.author - 작성자
 * @param {string} post.date - 작성일
 * @param {string} post.thumbnail - 썸네일 이미지 URL
 * @param {number} post.likes - 좋아요 수
 * @param {number} post.comments - 댓글 수
 *
 * Example usage:
 * <PostCard post={post} />
 */
function PostCard({ post }) {
  return (
    <GlowCard sx={{ height: '100%', textAlign: 'left', overflow: 'hidden' }}>
      <Box component={NavLink} to={`/posts/${post.id}`} sx={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          image={post.thumbnail}
          alt={post.title}
          sx={{ height: 160, objectFit: 'cover' }}
        />
        <CardContent>
          <Chip
            label={post.category}
            size="small"
            sx={{
              mb: 1.5,
              bgcolor: 'background.default',
              color: 'primary.main',
              border: '1px solid',
              borderColor: 'primary.dark',
              fontWeight: 600,
            }}
          />
          <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '1.05rem', mb: 1 }}>
            {post.title}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.6, mb: 2 }}>
            {post.excerpt}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ color: 'text.disabled', fontSize: '0.8rem' }}>
              {post.author} · {post.date}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, color: 'text.disabled', fontSize: '0.85rem' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FavoriteIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
                {post.likes}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ChatBubbleOutlineIcon sx={{ fontSize: '1rem', color: 'secondary.main' }} />
                {post.comments}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </GlowCard>
  );
}

export default PostCard;
