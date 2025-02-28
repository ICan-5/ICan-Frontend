interface Props {
  repeat?: number;
}
export default function SimpleTodoSkeleton({ repeat = 4 }: Props) {
  return Array.from({ length: repeat }, (_, i) => i + 1).map((e) => (
    <div
      key={e}
      className="my-2 block h-6 w-full flex-none animate-pulse rounded-md bg-gs100 2xl:h-7"
    />
  ));
}
