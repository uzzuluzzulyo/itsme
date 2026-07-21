import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import { supabase } from '../../lib/supabase.js';
import { getCurrentUserId } from '../../lib/auth.js';

const IMAGE_BUCKET = 'itsme-posts';

/**
 * WritePostDialog 컴포넌트
 *
 * 새 게시글 작성 다이얼로그. 이미지 첨부(선택)를 지원한다.
 *
 * Props:
 * @param {boolean} open - 다이얼로그 표시 여부 [Required]
 * @param {function} onClose - 닫기 콜백 [Required]
 * @param {array} categories - itsme_categories 목록 [Required]
 * @param {function} onCreated - 작성 성공 후 목록 갱신 콜백 [Optional]
 *
 * Example usage:
 * <WritePostDialog open={open} onClose={() => setOpen(false)} categories={categories} onCreated={fetchPosts} />
 */
function WritePostDialog({ open, onClose, categories, onCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function reset() {
    setTitle('');
    setContent('');
    setCategoryId('');
    setImageFile(null);
    setImagePreview('');
    setError('');
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    const userId = getCurrentUserId();
    if (!userId) {
      setError('로그인이 필요해요.');
      return;
    }
    if (!title.trim() || !content.trim() || !categoryId) {
      setError('제목, 내용, 카테고리를 모두 입력해주세요.');
      return;
    }

    setSubmitting(true);

    let imageUrl = null;
    if (imageFile) {
      const path = `${userId}/${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabase.storage.from(IMAGE_BUCKET).upload(path, imageFile);
      if (uploadError) {
        setSubmitting(false);
        setError('이미지 업로드에 실패했습니다.');
        return;
      }
      imageUrl = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
    }

    const { error: insertError } = await supabase.from('itsme_posts').insert({
      title: title.trim(),
      content: content.trim(),
      category_id: categoryId,
      user_id: userId,
      image_url: imageUrl,
    });
    setSubmitting(false);

    if (insertError) {
      setError('글 등록에 실패했습니다.');
      return;
    }

    reset();
    onCreated?.();
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography sx={{ color: 'text.primary', fontWeight: 800, fontSize: '1.1rem' }}>글쓰기</Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Stack spacing={2}>
          <TextField
            select
            label="카테고리"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            size="small"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="제목"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            size="small"
          />
          <TextField
            label="내용"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            multiline
            minRows={5}
          />

          <Button
            component="label"
            startIcon={<ImageRoundedIcon />}
            sx={{
              alignSelf: 'flex-start',
              color: 'text.secondary',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            사진 첨부
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </Button>

          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="첨부 이미지 미리보기"
              sx={{ width: '100%', maxHeight: 240, objectFit: 'cover', borderRadius: 1 }}
            />
          )}

          {error && <Typography sx={{ color: 'secondary.main', fontSize: '0.85rem' }}>{error}</Typography>}
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            variant="contained"
            sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 700 }}
          >
            {submitting ? (imageFile ? '업로드 중...' : '등록 중...') : '등록하기'}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default WritePostDialog;
