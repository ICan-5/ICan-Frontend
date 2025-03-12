export default function NoteSkeleton() {
  return (
    <div className="relative size-full">
      <div className="flex flex-col gap-2">
        <div className="h-4 animate-pulse bg-gs100" />
        <div className="h-4 animate-pulse bg-gs100" />
      </div>
      <div className="absolute bottom-0 h-11 w-full animate-pulse rounded-full bg-gs100" />
    </div>
  );
}
