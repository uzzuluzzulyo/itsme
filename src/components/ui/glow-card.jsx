import Card from '@mui/material/Card';

/**
 * GlowCard 컴포넌트
 *
 * 어두운 배경 위에 은은한 빛이 새어나오는 느낌의 카드
 *
 * Props:
 * @param {node} children - 카드 내부 콘텐츠 [Required]
 * @param {object} sx - 추가 스타일 오버라이드 [Optional]
 * @param {boolean} alwaysGlow - 커서를 올리지 않아도 빛 효과를 항상 유지 [Optional, 기본값: false]
 *
 * Example usage:
 * <GlowCard alwaysGlow><CardContent>내용</CardContent></GlowCard>
 */
function GlowCard({ children, sx = {}, alwaysGlow = false }) {
  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: alwaysGlow ? 'primary.main' : 'divider',
        borderRadius: 3,
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        boxShadow: alwaysGlow ? (theme) => `0 0 32px ${theme.palette.primary.dark}55` : '0 0 0 rgba(94, 234, 212, 0)',
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
