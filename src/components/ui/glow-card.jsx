import Card from '@mui/material/Card';

/**
 * GlowCard 컴포넌트
 *
 * 어두운 배경 위에 은은한 빛이 새어나오는 느낌의 카드
 *
 * Props:
 * @param {node} children - 카드 내부 콘텐츠 [Required]
 * @param {object} sx - 추가 스타일 오버라이드 [Optional]
 *
 * Example usage:
 * <GlowCard><CardContent>내용</CardContent></GlowCard>
 */
function GlowCard({ children, sx = {} }) {
  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        boxShadow: '0 0 0 rgba(94, 234, 212, 0)',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: (theme) => `0 0 32px ${theme.palette.primary.dark}55`,
        },
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}

export default GlowCard;
