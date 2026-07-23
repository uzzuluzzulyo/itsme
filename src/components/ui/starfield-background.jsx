import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

const twinkle = keyframes`
  0%, 100% { opacity: 0.15; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.15); }
`;

const shoot = keyframes`
  0% { transform: translate(0, 0) rotate(-35deg); opacity: 0; }
  8% { opacity: 1; }
  25% { opacity: 0; }
  100% { transform: translate(-420px, 420px) rotate(-35deg); opacity: 0; }
`;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * StarfieldBackground 컴포넌트
 *
 * 반짝이는 별과 가끔 떨어지는 별똥별로 몽환적인 배경을 연출한다. 부모 요소에
 * position: relative를 지정하고 그 첫 자식으로 넣어 쓴다.
 *
 * Props:
 * @param {number} starCount - 반짝이는 별 개수 [Optional, 기본값: 60]
 * @param {number} shootingStarCount - 별똥별 개수 [Optional, 기본값: 4]
 *
 * Example usage:
 * <Box sx={{ position: 'relative' }}><StarfieldBackground />...</Box>
 */
function StarfieldBackground({ starCount = 60, shootingStarCount = 4 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, () => ({
        top: `${randomBetween(0, 100)}%`,
        left: `${randomBetween(0, 100)}%`,
        size: randomBetween(1, 3),
        duration: randomBetween(2, 5),
        delay: randomBetween(0, 4),
      })),
    [starCount],
  );

  const shootingStars = useMemo(
    () =>
      Array.from({ length: shootingStarCount }, () => ({
        top: `${randomBetween(0, 60)}%`,
        left: `${randomBetween(20, 100)}%`,
        duration: randomBetween(6, 10),
        delay: randomBetween(0, 12),
      })),
    [shootingStarCount],
  );

  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,77,255,0.04), transparent 70%)',
      }}
    >
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
      {shootingStars.map((star, index) => (
        <Box
          key={`shoot-${index}`}
          sx={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: '2px',
            height: '90px',
            borderRadius: '999px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0))',
            animation: `${shoot} ${star.duration}s linear ${star.delay}s infinite`,
          }}
        />
      ))}
    </Box>
  );
}

export default StarfieldBackground;
