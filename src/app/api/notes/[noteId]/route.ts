import { NextRequest } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function GET(
  req: NextRequest,
  { params }: { params: { noteId: number } },
) {
  const { noteId } = params;

  const res = await fetchIntance({
    base: 'CODEIT',
    method: 'GET',
    url: `/notes/${noteId}`,
  });

  if (!res.ok) {
    return res;
  }

  return res;
}
