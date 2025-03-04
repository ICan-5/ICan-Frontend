import cn from '@/utils/cn';

interface Props {
  date: string;
  progress: number;
}

export default function TodoGrassCell({ date, progress }: Props) {
  const currentYear = `${new Date().getFullYear()}`;

  const getCellColor = () => {
    if (progress === 0) return 'bg-slate50';
    if (progress < 20) return 'bg-slate100'; // 연한 색
    if (progress < 40) return 'bg-slate200'; // 조금 더 진한 색
    if (progress < 60) return 'bg-slate300'; // 중간색
    if (progress < 80) return 'bg-slate400'; // 진한 색
    if (progress < 100) return 'bg-slate500';
    return 'bg-slate600'; // 매우 진한 색
  };

  return (
    <li
      className={cn(`size-4 flex-none rounded-[4px] ${getCellColor()}`, {
        invisible: currentYear !== date.slice(0, 4),
      })}
    />
  );
}
