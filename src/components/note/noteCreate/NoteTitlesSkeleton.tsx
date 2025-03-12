export default function NoteTitlesSkeleton() {
  return (
    <div className="mx-6 flex flex-col gap-1">
      <section className="mt-2 flex size-full items-center gap-2">
        <div className="h-6 w-full animate-pulse bg-gs100" />
      </section>
      <article className="mb-2 flex size-full items-center gap-2 text-gs700">
        <div className="h-6 w-full animate-pulse bg-gs100" />
      </article>
    </div>
  );
}
