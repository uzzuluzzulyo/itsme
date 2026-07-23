import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

const twinkle = keyframes`
  0%, 100% { opacity: 0.15; transform: scale(0.8); }
  50% { opacity: 0.9; transform: scale(1.15); }
`;

const beamBreathe = keyframes`
  0%, 100% { opacity: var(--base-opacity); }
  50% { opacity: var(--peak-opacity); }
`;

const glowBreathe = keyframes`
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.9); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
`;

const NOISE_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>" +
  "<feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.08 0.08 0.08 0 0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(%23n)'/></svg>";

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * LightRaysBackground 컴포넌트
 *
 * 어둡고 은은한 필름 그레인 위로, 위에서 아래로 부드럽게 번지는 빛줄기와
 * 그 끝에서 숨쉬듯 빛나는 발광점, 그리고 반짝이는 별들로 몽환적인 분위기를 낸다.
 * 부모 요소에 position: relative를 지정하고 그 첫 자식으로 넣어 쓴다.
 *
 * Props:
 * @param {number} starCount - 반짝이는 별 개수 [Optional, 기본값: 40]
 * @param {number} beamCount - 빛줄기 개수 [Optional, 기본값: 2]
 *
 * Example usage:
 * <Box sx={{ position: 'relative' }}><LightRaysBackground /></Box>
 */
function LightRaysBackground({ starCount = 40, beamCount = 2 }) {
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

  const beams = useMemo(
    () =>
      Array.from({ length: beamCount }, () => ({
        left: `${randomBetween(15, 85)}%`,
        length: randomBetween(160, 340),
        baseOpacity: randomBetween(0.12, 0.22),
        peakOpacity: randomBetween(0.35, 0.55),
        duration: randomBetween(6, 10),
        delay: randomBetween(0, 4),
        glowSize: randomBetween(70, 130),
        glowDuration: randomBetween(5, 8),
        glowDelay: randomBetween(0, 3),
      })),
    [beamCount],
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
        background:
          'radial-gradient(ellipse 60% 55% at 50% -10%, rgba(124,77,255,0.16), transparent 65%),' +
          'radial-gradient(ellipse 55% 45% at 8% 105%, rgba(214,143,255,0.12), transparent 70%),' +
          'radial-gradient(ellipse 40% 40% at 100% 100%, rgba(94,53,177,0.14), transparent 70%)',
      }}
    >
      {/* 필름 그레인 텍스처 */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,${NOISE_SVG}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '140px 140px',
          mixBlendMode: 'screen',
          opacity: 0.55,
        }}
      />

      {/* 위에서 아래로 번지는 빛줄기와 발광점 */}
      {beams.map((beam, index) => (
        <Box key={index}>
          <Box
            sx={{
              '--base-opacity': beam.baseOpacity,
              '--peak-opacity': beam.peakOpacity,
              position: 'absolute',
              top: 0,
              left: beam.left,
              width: '1.5px',
              height: beam.length,
              background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.5) 75%, rgba(255,255,255,0.85) 100%)',
              filter: 'blur(0.5px)',
              animation: `${beamBreathe} ${beam.duration}s ease-in-out ${beam.delay}s infinite`,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: beam.length,
              left: beam.left,
              width: beam.glowSize,
              height: beam.glowSize,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.28) 25%, rgba(255,255,255,0.1) 50%, transparent 75%)',
              filter: 'blur(6px)',
              animation: `${glowBreathe} ${beam.glowDuration}s ease-in-out ${beam.glowDelay}s infinite`,
            }}
          />
        </Box>
      ))}

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
