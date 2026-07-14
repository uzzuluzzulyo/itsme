import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/SearchRounded';
import PostCard from '../components/ui/post-card.jsx';
import { supabase } from '../lib/supabase.js';
import { formatDate } from '../utils/format-date.js';

const ALL_CATEGORY = '전체';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([ALL_CATEGORY]);
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORY);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const { data: categoryRows } = await supabase
        .from('itsme_categories')
        .select('name')
        .order('id');
      setCategories([ALL_CATEGORY, ...(categoryRows ?? []).map((row) => row.name)]);

      const { data, error } = await supabase
        .from('itsme_posts')
        .select('id, title, content, image_url, created_at, itsme_categories(name), itsme_comments(count), itsme_likes(count)')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPosts(
          data.map((row) => ({
            id: row.id,
            category: row.itsme_categories?.name ?? '기타',
            title: row.title,
            excerpt: row.content?.slice(0, 60) ?? '',
            author: 'itsme 유저',
            date: formatDate(row.created_at),
            thumbnail: row.image_url,
            likes: row.itsme_likes?.[0]?.count ?? 0,
            comments: row.itsme_comments?.[0]?.count ?? 0,
          }))
        );
      }
      setLoading(false);
    }
    loadPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === ALL_CATEGORY || post.category === selectedCategory;
    const matchesKeyword = post.title.includes(keyword) || post.excerpt.includes(keyword);
    return matchesCategory && matchesKeyword;
  });

  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 8 }, px: { xs: 2, md: 3 } }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{ color: 'text.primary', fontWeight: 700, mb: { xs: 3, md: 4 }, fontSize: { xs: '1.75rem', md: '2.25rem' } }}
        >
          게시물 목록
        </Typography>

        <TextField
          fullWidth
          placeholder="제목이나 내용으로 검색"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          sx={{
            mb: 3,
            maxWidth: 420,
            '& .MuiOutlinedInput-root': {
              bgcolor: 'background.paper',
              color: 'text.primary',
              '& fieldset': { borderColor: 'divider' },
              '&:hover fieldset': { borderColor: 'primary.main' },
              '&.Mui-focused fieldset': { borderColor: 'primary.main' },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            },
          }}
        />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: { xs: 3, md: 5 } }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              sx={{
                fontWeight: 600,
                bgcolor: selectedCategory === category ? 'primary.main' : 'background.paper',
                color: selectedCategory === category ? 'primary.contrastText' : 'text.secondary',
                border: '1px solid',
                borderColor: selectedCategory === category ? 'primary.main' : 'divider',
                boxShadow: selectedCategory === category
                  ? (theme) => `0 0 14px ${theme.palette.primary.main}66`
                  : 'none',
                '&:hover': { borderColor: 'primary.main' },
              }}
            />
          ))}
        </Box>

        {loading ? (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 8 }}>
            불러오는 중...
          </Typography>
        ) : filteredPosts.length === 0 ? (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 8 }}>
            조건에 맞는 게시물이 없습니다.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredPosts.map((post) => (
              <Grid key={post.id} size={{ xs: 12, md: 4 }}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default Posts;
