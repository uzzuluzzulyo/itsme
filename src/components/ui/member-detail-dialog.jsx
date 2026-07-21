import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
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
    <Dialog open={Boolean(member)} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 0.5 }}>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Box sx={{ textAlign: 'center', mb: 2.5 }}>
          <MemberAvatar member={member} size={104} />
          <Typography sx={{ color: 'text.primary', fontWeight: 800, fontSize: '1.4rem', mt: 1.5 }}>
            {member.stageName}
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
            {member.stageNameEn} · {member.realName}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap justifyContent="center" sx={{ mb: 2.5 }}>
          <Chip label={member.position} size="small" sx={{ bgcolor: `${member.color}22`, color: member.color, fontWeight: 700 }} />
          <Chip label={member.nationality} size="small" variant="outlined" sx={{ borderColor: 'divider', color: 'text.secondary' }} />
          <Chip label={formatBirthDate(member.birthDate)} size="small" variant="outlined" sx={{ borderColor: 'divider', color: 'text.secondary' }} />
        </Stack>

        <Stack spacing={1.25} sx={{ mb: 2.5 }}>
          <InfoRow label="출신" value={member.hometown} />
          <InfoRow label="연습생 기간" value={member.trainingPeriod} />
          <InfoRow label="취미" value={member.hobby} />
          <InfoRow
            label="WISH DOLL"
            value={`${member.doll.emoji} ${member.doll.name} (${member.doll.symbol})`}
          />
        </Stack>

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
  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography sx={{ color: 'text.disabled', fontSize: '0.82rem' }}>{label}</Typography>
      <Typography sx={{ color: 'text.primary', fontSize: '0.82rem', fontWeight: 600, textAlign: 'right' }}>
        {value}
      </Typography>
    </Stack>
  );
}

export default MemberDetailDialog;
