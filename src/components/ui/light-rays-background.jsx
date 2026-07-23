import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

const twinkle = keyframes`
  0%, 100% { opacity: 0.15; transform: scale(0.8); }
  50% { opacity: 0.9; transform: scale(1.15); }
`;

const sway = keyframes`
  0%, 100% { transform: rotate(var(--base-angle)); opacity: 0.5; }
  50% { transform: rotate(calc(var(--base-angle) + 4deg)); opacity: 0.85; }
`;

const sparklePulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(0.85) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.1) rotate(8deg); }
`;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * LightRaysBackground 컴포넌트
 *
 * 보라빛 우주 느낌의 배경. 은은하게 반짝이는 별, 커다란 반짝임(스파클) 장식,
 * 그리고 한쪽 모서리에서 뻗어나와 서서히 흔들리는 빛줄기로 몽환적인 분위기를 낸다.
 * 부모 요소에 position: relative를 지정하고 그 첫 자식으로 넣어 쓴다.
 *
 * Props:
 * @param {number} starCount - 반짝이는 별 개수 [Optional, 기본값: 40]
 *
 * Example usage:
 * <Box sx={{ position: 'relative' }}><LightRaysBackground />...</Box>
 */
function LightRaysBackground({ starCount = 40 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, () => ({
        top: `${randomBetween(0, 100)}%`,
        left: `${randomBetween(0, 100)}%`,
        size: randomBetween(1, 2.5),
        duration: randomBetween(2, 5),
        delay: randomBetween(0, 4),
      })),
    [starCount],
  );

  const rayAngles = [-58, -46, -34, -22, -10];

  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 60% 55% at 50% -10%, rgba(124,77,255,0.35), transparent 65%),' +
          'radial-gradient(ellipse 55% 45% at 8% 105%, rgba(214,143,255,0.28), transparent 70%),' +
          'radial-gradient(ellipse 40% 40% at 100% 100%, rgba(94,53,177,0.3), transparent 70%)',
      }}
    >
      {/* 빛줄기: 우측 하단에서 뻗어나와 서서히 흔들림 */}
      <Box
        sx={{
          position: 'absolute',
          right: { xs: '-10%', md: '4%' },
          bottom: '-15%',
          width: 1,
          height: 1,
        }}
      >
        {rayAngles.map((angle, index) => (
          <Box
            key={angle}
            sx={{
              '--base-angle': `${angle}deg`,
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: { xs: 3, md: 5 },
              height: { xs: 320, md: 560 },
              transformOrigin: 'bottom center',
              transform: `rotate(${angle}deg)`,
              background: 'linear-gradient(180deg, rgba(214,169,255,0.55), rgba(124,77,255,0.08) 55%, transparent 100%)',
              filter: 'blur(2px)',
              animation: `${sway} ${8 + index}s ease-in-out ${index * 0.6}s infinite`,
            }}
          />
        ))}
      </Box>

      {/* 큰 스파클 장식 */}
      <AutoAwesomeRoundedIcon
        sx={{
          position: 'absolute',
          top: '12%',
          left: '10%',
          fontSize: { xs: 28, md: 40 },
          color: '#FFFFFF',
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.7))',
          animation: `${sparklePulse} 5s ease-in-out infinite`,
        }}
      />
      <AutoAwesomeRoundedIcon
        sx={{
          position: 'absolute',
          top: '68%',
          right: '14%',
          fontSize: { xs: 18, md: 26 },
          color: '#E7D6FF',
          filter: 'drop-shadow(0 0 8px rgba(231,214,255,0.7))',
          animation: `${sparklePulse} 6.5s ease-in-out 1.2s infinite`,
        }}
      />

      {stars.map((star, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            bgcolor: '#FFFFFF',
            boxShadow: '0 0 6px rgba(255,255,255,0.8)',
            animation: `${twinkle} ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </Box>
  );
}

export default LightRaysBackground;
