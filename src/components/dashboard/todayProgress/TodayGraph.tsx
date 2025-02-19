'use client';

import { useEffect, useState } from 'react';

type Props = {
  progress: number;
};

export default function TodayGraph({ progress }: Props) {
  // 전체 원의 길이
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  // 진행 상황에 따른 길이 계산
  const progressDashOffset = circumference * (1 - (2 / 3) * progress);

  const [dashOffset, setDashOffset] = useState(circumference);

  useEffect(() => {
    setTimeout(() => {
      setDashOffset(progressDashOffset);
    }, 300);
  }, [progressDashOffset]);

  return (
    <div className="relative top-6 flex-1">
      <div className="clip-circle-40 absolute bottom-0 left-1/2 aspect-square h-full w-auto -translate-x-1/2 rounded-full bg-gradient-to-b from-gs00 to-transparent" />
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[150deg]"
        width="140%"
        height="140%"
        viewBox="0 0 120 120"
      >
        <circle
          cx="60"
          cy="60"
          r={50}
          fill="none"
          stroke="#ddd"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 / 3)}
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rotate-[150deg]"
        width="140%"
        height="140%"
        viewBox="0 0 120 120"
      >
        <circle
          className="transition-all duration-[2000ms]"
          cx="60"
          cy="60"
          r={50}
          fill="none"
          stroke="#3688ff"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
