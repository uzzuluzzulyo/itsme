import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';

/**
 * CursorEffects 컴포넌트
 *
 * 마우스를 따라다니는 스포트라이트 글로우와 커스텀 커서(링크 위에서 확대)를
 * 전역에 렌더링한다. 포인터가 정밀한 기기(데스크톱)에서만, 그리고 모션 감소
 * 설정이 꺼져 있을 때만 동작한다.
 *
 * Example usage:
 * <CursorEffects />
 */
function CursorEffects() {
  const cursorRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    const canHover = window.matchMedia('(pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduceMotion) return undefined;

    const cursor = cursorRef.current;
    const spotlight = spotlightRef.current;

    function handleMove(event) {
      const { clientX: x, clientY: y } = event;
      cursor.style.transform = `translate(${x}px, ${y}px)`;
      spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(79,216,176,0.10), transparent 60%)`;
      cursor.style.opacity = '1';
      spotlight.style.opacity = '1';
    }

    function handleLeave() {
      cursor.style.opacity = '0';
      spotlight.style.opacity = '0';
    }

    function handleOver(event) {
      if (event.target.closest('a, button, [role="button"]')) {
        cursor.classList.add('is-expanded');
      }
    }

    function handleOut(event) {
      if (event.target.closest('a, button, [role="button"]')) {
        cursor.classList.remove('is-expanded');
      }
    }

    document.body.classList.add('has-custom-cursor');
    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <>
      <Box
        ref={spotlightRef}
        aria-hidden
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      <Box
        ref={cursorRef}
        aria-hidden
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          ml: '-10px',
          mt: '-10px',
          borderRadius: '50%',
          border: '1.5px solid',
          borderColor: 'primary.main',
          zIndex: 2000,
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.2s ease, width 0.2s ease, height 0.2s ease, margin 0.2s ease, background 0.2s ease',
          '&.is-expanded': {
            width: 48,
            height: 48,
            ml: '-24px',
            mt: '-24px',
            bgcolor: 'rgba(79,216,176,0.12)',
          },
        }}
      />
    </>
  );
}

export default CursorEffects;
