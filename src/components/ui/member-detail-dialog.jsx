import { Link as RouterLink } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MemberAvatar from './member-avatar.jsx';

function formatBirthDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${year}.${month}.${day}`;
}

/**
 * MemberDetailDialog 컴포넌트
 *
 * 멤버 카드를 눌렀을 때 상세 정보를 보여주는 다이얼로그.
 *
 * Props:
 * @param {object} member - members.js의 멤버 객체 [Required, null이면 렌더링 안 함]
 * @param {function} onClose - 닫기 콜백 [Required]
 *
 * Example usage:
 * <MemberDetailDialog member={selected} onClose={() => setSelected(null)} />
 */
function MemberDetailDialog({ member, onClose }) {
  if (!member) return null;

  return (
    <Dialog open={Boolean(member)} onClose={onClose} maxWidth="xs" fullWidth scroll="paper">
      <DialogContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 0.5 }}>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 2.5 }}>
          <MemberAvatar member={member} size={104} />
          <Typography sx={{ color: 'text.primary', fontWeight: 800, fontSize: '1.4rem', mt: 1.5 }}>
            {member.stageName}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 1.5 }}>
            {member.stageNameEn} · {member.realName}
          </Typography>
          <Button
            component={RouterLink}
            to={`/gateway?member=${member.id}`}
            startIcon={<FavoriteRoundedIcon />}
            size="small"
            variant="outlined"
            sx={{ borderColor: member.color, color: member.color, fontWeight: 700 }}
          >
            {member.stageName}(으)로 입덕하러 가기
          </Button>
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap justifyContent="center" sx={{ mb: 2.5 }}>
          <Chip label={member.position} size="small" sx={{ bgcolor: `${member.color}22`, color: member.color, fontWeight: 700 }} />
          <Chip label={member.nationality} size="small" variant="outlined" sx={{ borderColor: 'divider', color: 'text.secondary' }} />
          <Chip label={formatBirthDate(member.birthDate)} size="small" variant="outlined" sx={{ borderColor: 'divider', color: 'text.secondary' }} />
        </Stack>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2, rowGap: 1, mb: 2.5 }}>
          <InfoRow label="키" value={member.height} />
          <InfoRow label="몸무게" value={member.weight} />
          <InfoRow label="혈액형" value={member.bloodType} />
          <InfoRow label="MBTI" value={member.mbti} />
          <InfoRow label="별자리" value={member.zodiac} />
          <InfoRow label="띠" value={member.chineseZodiac} />
          <InfoRow label="출신" value={member.hometown} />
          <InfoRow label="연습 기간" value={member.trainingPeriod} />
          <InfoRow label="숙소" value={member.dorm} />
          <InfoRow label="롤모델" value={member.roleModel} />
          <InfoRow label="최애곡" value={member.favoriteSong !== '-' ? member.favoriteSong : null} />
        </Box>

        <Box sx={{ mb: 2.5 }}>
          <Typography sx={{ color: 'text.disabled', fontSize: '0.82rem', mb: 0.5 }}>취미</Typography>
          <Typography sx={{ color: 'text.primary', fontSize: '0.85rem', fontWeight: 600 }}>{member.hobby}</Typography>
        </Box>

        <Box sx={{ mb: 2.5 }}>
          <Typography sx={{ color: 'text.disabled', fontSize: '0.82rem', mb: 0.5 }}>WISH DOLL</Typography>
          <Typography sx={{ color: 'text.primary', fontSize: '0.85rem', fontWeight: 600 }}>
            {member.doll.emoji} {member.doll.name} ({member.doll.symbol})
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'divider', mb: 2 }} />

        <Typography sx={{ color: 'text.primary', fontSize: '0.92rem', lineHeight: 1.8, mb: 2 }}>
          {member.bio}
        </Typography>

        {member.funFacts?.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ color: 'text.primary', fontWeight: 700, fontSize: '0.85rem', mb: 1 }}>
              알아두면 좋은 사실
            </Typography>
            <Stack spacing={0.75}>
              {member.funFacts.map((fact) => (
                <Typography key={fact} sx={{ color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  · {fact}
                </Typography>
              ))}
            </Stack>
          </Box>
        )}

        <Typography sx={{ color: 'text.disabled', fontSize: '0.7rem', mt: 2 }}>
          정보 출처: 나무위키, kprofiles.com 등 공개 프로필 정보를 종합 정리했습니다.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <Stack direction="row" justifyContent="space-between" spacing={1}>
      <Typography sx={{ color: 'text.disabled', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{label}</Typography>
      <Typography sx={{ color: 'text.primary', fontSize: '0.8rem', fontWeight: 600, textAlign: 'right' }}>
        {value}
      </Typography>
    </Stack>
  );
}

export default MemberDetailDialog;
