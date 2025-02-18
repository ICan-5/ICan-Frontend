'use client';

import { useState } from 'react';
import Navbar from '@/components/common/navbar/Navbar';
import cn from '@/utils/cn';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isFolded, setIsFolded] = useState<boolean>(window.innerWidth <= 640);

  const toggleFold = () => {
    setIsFolded((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100 will-change-scroll">
      <Navbar isFolded={isFolded} onToggle={toggleFold} />
      <div
        className={cn('sm:hidden', {
          'fixed inset-0 z-10 bg-black bg-opacity-50': !isFolded,
        })}
        onClick={() => setIsFolded(true)}
      />
      <div
        className={cn(
          'ml-16 flex-1 overflow-y-auto overscroll-contain sm:ml-0',
        )}
      >
        {children}
      </div>
    </div>
  );
}
