import { NextRequest } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const { id } = params;
  const res = await fetchIntance({
    method: 'DELETE',
    url: `/calendar/todo-basket/${id}`,
  });

  return res;
}
