import cn from '@/utils/cn';

export default function TodayProgressSkeleton() {
  return (
    <div className="relative flex size-full min-h-48 flex-[3] flex-col rounded-2xl border-2 border-gs200 px-6 py-4 2xl:rounded-3xl">
      <p className="text-16SB text-gsBk 2xl:text-18SB">금일 진행도</p>
      <div className="relative top-6 flex-1">
        <div className="clip-circle-40 absolute bottom-0 left-1/2 aspect-square h-full w-auto -translate-x-1/2 rounded-full bg-gradient-to-b from-gs00 to-transparent" />
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[150deg]"
          width="140%"
          height="140%"
          viewBox="0 0 120 120"
        >
          <circle
            className="stroke-gs200"
            cx="60"
            cy="60"
            r={50}
            fill="none"
            strokeWidth="6"
            strokeDasharray={100 * Math.PI}
            strokeDashoffset={100 * Math.PI * (1 / 3)}
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        className={cn(
          'absolute left-0 top-1/2 flex w-full flex-col items-center gap-4 !text-40L text-gs100 md:gap-7 md:!text-50L',
        )}
      >
        0%
        <div className="h-4 animate-pulse bg-gs100 text-12R" />
      </div>
    </div>
  );
}
