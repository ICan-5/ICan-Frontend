'use client';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Icon from '@/components/common/icon/Icon';
import cn from '@/utils/cn';
import { THEME_COLORS } from '@/constants/thems';

export default function ThemeColors() {
  const [selectedColor, setSelectedColor] = useState<number>(0);

  const clickThemeColor = (index: number) => {
    setSelectedColor(index);
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(4.25rem,1fr))] place-items-center gap-4 2xl:grid-cols-[repeat(auto-fit,minmax(5.25rem,1fr))]">
      {THEME_COLORS.map((color, index) => (
        <div
          key={color.id}
          className={cn(
            'relative cursor-pointer rounded-lg border-2 border-transparent bg-gs00 p-2 hover:border-slate400',
            { 'border-slate400': index === selectedColor },
          )}
          onClick={() => clickThemeColor(index)}
        >
          <div className="relative flex size-12 flex-col 2xl:size-16">
            <div className={`h-1/2 w-full rounded-t-full ${color.secondary}`} />
            <div className="flex h-1/2 w-full">
              <div
                className={`h-full w-1/2 rounded-bl-full ${color.primary}`}
              />
              <div className="h-full w-1/2 rounded-br-full bg-gs300" />
            </div>
          </div>
          <Icon
            className={cn('absolute left-0 top-0 text-slate500', {
              hidden: index !== selectedColor,
            })}
            icon={faCheckCircle}
          />
        </div>
      ))}
    </div>
  );
}
