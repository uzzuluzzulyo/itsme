import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';

const twinkle = keyframes`
  0%, 100% { opacity: 0.15; transform: scale(0.8); }
  50% { opacity: 0.9; transform: scale(1.15); }
`;

const sway = keyframes`
  0%, 100% { transform: rotate(var(--base-angle)); opacity: var(--base-opacity); }
  50% { transform: rotate(calc(var(--base-angle) + var(--sway-amount))); opacity: var(--peak-opacity); }
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
 * 그리고 한쪽 모서리에서 뻗어나와 제각각의 길이·두께·속도로 서서히 흔들리는
 * 빛줄기로 몽환적인 분위기를 낸다. 부모 요소에 position: relative를 지정하고
 * 그 첫 자식으로 넣어 쓴다.
 *
 * Props:
 * @param {number} starCount - 반짝이는 별 개수 [Optional, 기본값: 40]
 * @param {number} rayCount - 빛줄기 개수 [Optional, 기본값: 5]
 * @param {string} corner - 빛줄기가 뻗어나오는 모서리 ('bottom-right' | 'bottom-left') [Optional, 기본값: 'bottom-right']
 *
 * Example usage:
 * <Box sx={{ position: 'relative' }}><LightRaysBackground /></Box>
 */
function LightRaysBackground({ starCount = 40, rayCount = 5, corner = 'bottom-right' }) {
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

  const rays = useMemo(() => {
    let cursor = randomBetween(-64, -56);
    return Array.from({ length: rayCount }, () => {
      const angle = cursor;
      cursor += randomBetween(9, 16);
      return {
        angle,
        length: randomBetween(220, 620),
        width: randomBetween(2, 6),
        baseOpacity: randomBetween(0.2, 0.4),
        peakOpacity: randomBetween(0.45, 0.75),
        swayAmount: randomBetween(2, 6),
        duration: randomBetween(7, 13),
        delay: randomBetween(0, 5),
      };
    });
  }, [rayCount]);

  const isLeft = corner === 'bottom-left';

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
          'radial-gradient(ellipse 60% 55% at 50% -10%, rgba(124,77,255,0.2), transparent 65%),' +
          'radial-gradient(ellipse 55% 45% at 8% 105%, rgba(214,143,255,0.15), transparent 70%),' +
          'radial-gradient(ellipse 40% 40% at 100% 100%, rgba(94,53,177,0.18), transparent 70%)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          [isLeft ? 'left' : 'right']: { xs: '-10%', md: '4%' },
          bottom: '-15%',
          width: 1,
          height: 1,
        }}
      >
        {rays.map((ray, index) => (
          <Box
            key={index}
            sx={{
              '--base-angle': `${isLeft ? -ray.angle : ray.angle}deg`,
              '--sway-amount': `${ray.swayAmount}deg`,
              '--base-opacity': ray.baseOpacity,
              '--peak-opacity': ray.peakOpacity,
              position: 'absolute',
              [isLeft ? 'left' : 'right']: 0,
              bottom: 0,
              width: ray.width,
              height: ray.length,
              transformOrigin: 'bottom center',
              transform: `rotate(${isLeft ? -ray.angle : ray.angle}deg)`,
              background: 'linear-gradient(180deg, rgba(214,169,255,0.5), rgba(124,77,255,0.06) 55%, transparent 100%)',
              filter: 'blur(2px)',
              animation: `${sway} ${ray.duration}s ease-in-out ${ray.delay}s infinite`,
            }}
          />
        ))}
      </Box>

      <AutoAwesomeRoundedIcon
        sx={{
          position: 'absolute',
          top: '12%',
          left: '10%',
          fontSize: { xs: 24, md: 34 },
          color: '#FFFFFF',
          filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.55))',
          animation: `${sparklePulse} 5s ease-in-out infinite`,
        }}
      />
      <AutoAwesomeRoundedIcon
        sx={{
          position: 'absolute',
          top: '68%',
          right: '14%',
          fontSize: { xs: 16, md: 22 },
          color: '#E7D6FF',
          filter: 'drop-shadow(0 0 6px rgba(231,214,255,0.55))',
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
