import cn from '@/utils/cn';

export default function GoalTabSkelton() {
  return Array.from({ length: 10 }, (_, i) => i).map((e) => (
    <div
      key={e}
      className={cn(
        'text-overflow relative h-9 flex-none rounded-t-lg bg-gs50 px-3 py-2 text-left text-14M text-gs400 transition-all duration-150',
        { 'w-40 bg-gs00 text-gsBk md:w-56': e === 0 },
        { 'w-20 border-x border-t border-gs200 md:w-32': e > 0 },
      )}
    >
      <span
        className={cn(
          'invisible absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 bg-slate500',
          { visible: e === 0 },
        )}
      />
    </div>
  ));
}
