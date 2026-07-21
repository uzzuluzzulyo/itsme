import Box from '@mui/material/Box';

/**
 * MemberAvatar 컴포넌트
 *
 * 멤버 컬러 기반의 원형 아바타. imageUrl이 있으면 사진을, 없으면 WISH DOLL 심볼
 * 이모지를 보여준다.
 *
 * Props:
 * @param {object} member - members.js의 멤버 객체 [Required]
 * @param {number} size - 아바타 지름(px) [Optional, 기본값: 72]
 *
 * Example usage:
 * <MemberAvatar member={members[0]} size={96} />
 */
function MemberAvatar({ member, size = 72 }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        mx: 'auto',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.46,
        background: `radial-gradient(circle at 30% 25%, ${member.color}, ${member.color}CC 70%)`,
        boxShadow: `0 0 24px ${member.color}55`,
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {member.imageUrl ? (
        <Box
          component="img"
          src={member.imageUrl}
          alt={member.stageName}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        member.doll?.emoji ?? member.stageNameEn[0]
      )}
    </Box>
  );
}

export default MemberAvatar;
