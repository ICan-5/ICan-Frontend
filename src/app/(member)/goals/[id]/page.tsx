export default function Page({ params }: { params: { id: string } }) {
  return <div>Goal {params.id} Page</div>;
}
