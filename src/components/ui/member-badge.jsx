import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { members } from '../../utils/members.js';

/**
 * MemberBadge 컴포넌트
 *
 * 사용자의 최애 멤버를 컬러 점 + 이름으로 표시한다. favoriteMember가 없으면 아무것도 렌더링하지 않는다.
 *
 * Props:
 * @param {string} favoriteMember - members.js의 멤버 id [Optional]
 *
 * Example usage:
 * <MemberBadge favoriteMember="sion" />
 */
function MemberBadge({ favoriteMember }) {
  const member = members.find((item) => item.id === favoriteMember);
  if (!member) return null;

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
      <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: member.color, flexShrink: 0 }} />
      <Typography sx={{ color: 'text.secondary', fontSize: '0.72rem' }}>{member.stageName}</Typography>
    </Box>
  );
}

export default MemberBadge;
