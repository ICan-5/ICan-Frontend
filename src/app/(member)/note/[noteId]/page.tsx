export default async function PhotoPage({
  params,
}: {
  params: Promise<{ noteId: string }>;
}) {
  const id = (await params).noteId;
  return <div className="card">{id}</div>;
}
