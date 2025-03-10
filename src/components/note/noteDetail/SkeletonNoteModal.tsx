export default function SkeletonNoteModal() {
  return (
    <div className="animate-pulse">
      <div className="flex grow flex-col gap-6 overflow-y-auto px-6">
        <div className="h-4 w-1/3 rounded bg-gs100" />

        <div className="h-4 w-1/2 rounded bg-gs100" />

        <div className="h-6 w-3/4 rounded bg-gs100" />

        <div className="h-6 w-full rounded bg-gs100" />

        <div className="h-20 w-full rounded bg-gs100" />
        <div className="h-20 w-full rounded bg-gs100" />
      </div>
    </div>
  );
}
