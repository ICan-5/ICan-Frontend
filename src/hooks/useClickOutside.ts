'use client';

import { useEffect, useRef, useState } from 'react';

export function useClickOutside<T extends HTMLElement>(callback?: () => void) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (callback) callback();
        else setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return [ref, isOpen, setIsOpen] as const;
}
