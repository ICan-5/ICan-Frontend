import { NextRequest } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

// 장바구니 할일 삭제
export async function DELETE(
  req: NextRequest,
  { params }: { params: { basketTodoId: number } },
) {
  const { basketTodoId } = params;

  const res = await fetchIntance({
    method: 'DELETE',
    url: `/calendar/todo-basket/${basketTodoId}`,
  });

  return res;
}
