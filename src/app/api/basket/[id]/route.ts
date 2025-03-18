import { NextRequest } from 'next/server';
import { fetchInstance } from '@/services/fetchInstance';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const { id } = params;
  const res = await fetchInstance({
    method: 'DELETE',
    url: `/calendar/todo-basket/${id}`,
  });

  return res;
}
