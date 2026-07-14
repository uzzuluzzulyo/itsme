import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SectionContainer from '../ui/section-container.jsx';
import PostCard from '../ui/post-card.jsx';
import { supabase } from '../../lib/supabase.js';
import { formatDate } from '../../utils/format-date.js';

function PostPreviewSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPreview() {
      const { data, error } = await supabase
        .from('itsme_posts')
        .select('id, title, content, image_url, created_at, itsme_categories(name), itsme_comments(count), itsme_likes(count)')
        .order('created_at', { ascending: false })
        .limit(3);

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
    }
    loadPreview();
  }, []);

  return (
    <SectionContainer bgColor="background.default" maxWidth="lg">
      <Typography
        variant="h4"
        sx={{ color: 'text.primary', fontWeight: 700, mb: { xs: 4, md: 6 }, fontSize: { xs: '1.5rem', md: '2rem' } }}
      >
        최신 게시물
      </Typography>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid key={post.id} size={{ xs: 12, md: 4 }}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </SectionContainer>
  );
}

export default PostPreviewSection;
