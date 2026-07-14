import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

/**
 * SectionContainer 컴포넌트
 *
 * Props:
 * @param {node} children - 섹션 내부 콘텐츠 [Required]
 * @param {string} bgColor - 섹션 배경색 (theme 토큰 문자열 권장) [Optional, 기본값: 'background.default']
 * @param {string} maxWidth - Container 최대 너비 [Optional, 기본값: 'md']
 *
 * Example usage:
 * <SectionContainer bgColor="background.paper"><Typography>내용</Typography></SectionContainer>
 */
function SectionContainer({ children, bgColor = 'background.default', maxWidth = 'md' }) {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: bgColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Container maxWidth={maxWidth} sx={{ textAlign: 'center' }}>
        {children}
      </Container>
    </Box>
  );
}

export default SectionContainer;
