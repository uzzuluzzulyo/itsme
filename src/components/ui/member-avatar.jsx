import Box from '@mui/material/Box';

/**
 * MemberAvatar 컴포넌트
 *
 * 멤버 컬러 기반의 이니셜 원형 아바타. 실제 사진이 없을 때 사용한다.
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
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: size * 0.36,
        color: '#04141F',
        background: `radial-gradient(circle at 30% 25%, ${member.color}, ${member.color}CC 70%)`,
        boxShadow: `0 0 24px ${member.color}55`,
        flexShrink: 0,
      }}
    >
      {member.stageNameEn[0]}
    </Box>
  );
}

export default MemberAvatar;
