import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import GlowCard from '../components/ui/glow-card.jsx';
import MemberBadge from '../components/ui/member-badge.jsx';
import PostDetailDialog from '../components/board/post-detail-dialog.jsx';
import WritePostDialog from '../components/board/write-post-dialog.jsx';
import { supabase } from '../lib/supabase.js';

function Board() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [commentCounts, setCommentCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [writeOpen, setWriteOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);

  const fetchCategories = async () => {
    const { data } = await supabase.from('itsme_categories').select('*').order('id');
    setCategories(data ?? []);
  };

  const fetchPosts = async () => {
    setLoading(true);
    let query = supabase
      .from('itsme_posts')
      .select('*, itsme_users(nickname, favorite_member), itsme_categories(name)')
      .order('created_at', { ascending: false });

    if (selectedCategory !== 'all') {
      query = query.eq('category_id', selectedCategory);
    }

    const { data } = await query;
    const list = data ?? [];
    setPosts(list);

    if (list.length > 0) {
      const postIds = list.map((post) => post.id);
      const [{ data: likeRows }, { data: commentRows }] = await Promise.all([
        supabase.from('itsme_likes').select('post_id').in('post_id', postIds),
        supabase.from('itsme_comments').select('post_id').in('post_id', postIds),
      ]);
      setLikeCounts(countByPostId(likeRows ?? []));
      setCommentCounts(countByPostId(commentRows ?? []));
    } else {
      setLikeCounts({});
      setCommentCounts({});
    }

    setLoading(false);
  };

  function countByPostId(rows) {
    return rows.reduce((acc, row) => {
      acc[row.post_id] = (acc[row.post_id] ?? 0) + 1;
      return acc;
    }, {});
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <Box sx={{ width: '100%', minHeight: '70vh', py: { xs: 4, md: 6 }, px: { xs: 2, md: 3 }, position: 'relative' }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{ color: 'text.primary', fontWeight: 800, mb: 3, fontSize: { xs: '1.6rem', md: '2.1rem' } }}
        >
          위시 게시판
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
          <Chip
            label="전체"
            onClick={() => setSelectedCategory('all')}
            sx={{
              bgcolor: selectedCategory === 'all' ? 'primary.main' : 'background.paper',
              color: selectedCategory === 'all' ? 'primary.contrastText' : 'text.secondary',
              fontWeight: 700,
              border: '1px solid',
              borderColor: selectedCategory === 'all' ? 'primary.main' : 'divider',
            }}
          />
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              onClick={() => setSelectedCategory(category.id)}
              sx={{
                bgcolor: selectedCategory === category.id ? 'primary.main' : 'background.paper',
                color: selectedCategory === category.id ? 'primary.contrastText' : 'text.secondary',
                fontWeight: 700,
                border: '1px solid',
                borderColor: selectedCategory === category.id ? 'primary.main' : 'divider',
              }}
            />
          ))}
        </Stack>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: 'primary.main' }} />
          </Box>
        )}

        {!loading && posts.length === 0 && (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>
            아직 등록된 글이 없어요. 첫 글을 남겨보세요!
          </Typography>
        )}

        <Stack spacing={1.5}>
          {posts.map((post) => (
            <GlowCard key={post.id} sx={{ cursor: 'pointer' }}>
              <CardContent
                sx={{ p: { xs: 2, md: 2.5 } }}
                onClick={() => setSelectedPost(post)}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  {post.itsme_categories?.name && (
                    <Chip
                      label={post.itsme_categories.name}
                      size="small"
                      sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700 }}
                    />
                  )}
                  <Typography sx={{ color: 'text.disabled', fontSize: '0.72rem' }}>
                    {new Date(post.created_at).toLocaleDateString('ko-KR', { dateStyle: 'medium' })}
                  </Typography>
                </Stack>

                <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '1.02rem', mb: 0.5 }}>
                  {post.title}
                </Typography>
                {post.image_url && (
                  <Box
                    component="img"
                    src={post.image_url}
                    alt=""
                    sx={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 1, mb: 1.5 }}
                  />
                )}
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.85rem',
                    mb: 1.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {post.content}
                </Typography>

                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {post.itsme_users?.nickname ?? '탈퇴한 사용자'}
                    </Typography>
                    <MemberBadge favoriteMember={post.itsme_users?.favorite_member} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, flexShrink: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <FavoriteRoundedIcon sx={{ fontSize: 15, color: 'secondary.main' }} />
                      <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
                        {likeCounts[post.id] ?? 0}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 15, color: 'text.disabled' }} />
                      <Typography sx={{ color: 'text.disabled', fontSize: '0.75rem' }}>
                        {commentCounts[post.id] ?? 0}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </GlowCard>
          ))}
        </Stack>
      </Container>

      <Fab
        onClick={() => setWriteOpen(true)}
        sx={{
          position: 'fixed',
          bottom: { xs: 24, md: 40 },
          right: { xs: 24, md: 40 },
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          '&:hover': { bgcolor: 'primary.dark' },
        }}
      >
        <AddRoundedIcon />
      </Fab>

      <PostDetailDialog
        post={selectedPost}
        open={Boolean(selectedPost)}
        onClose={() => setSelectedPost(null)}
        onLikeChange={fetchPosts}
        onEdit={(post) => {
          setSelectedPost(null);
          setEditPost(post);
        }}
        onDeleted={fetchPosts}
      />
      <WritePostDialog
        open={writeOpen || Boolean(editPost)}
        onClose={() => {
          setWriteOpen(false);
          setEditPost(null);
        }}
        categories={categories}
        onCreated={fetchPosts}
        editPost={editPost}
      />
    </Box>
  );
}

export default Board;
