import { useRef, useState } from 'react';

export function useDragScroll<T extends HTMLElement>() {
  const scrollRef = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  /** 드래그 시작 */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  /** 드래그 중 */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;

    const x = e.clientX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // 드래그 속도 조절
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  /** 드래그 종료 */
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  /** 마우스가 화면을 떠날 때 드래그 종료 */
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  return {
    isDragging,
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  };
}
