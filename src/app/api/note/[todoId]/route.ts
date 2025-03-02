import { NextRequest } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

// 노트 생성
export async function POST(
  req: NextRequest,
  { params }: { params: { todoId: number } },
) {
  const { todoId } = params;
  const body = await req.json();
  const { title, content, linkUrl } = body;

  console.log(
    'todoId, title, content, linkUrl',
    todoId,
    title,
    content,
    linkUrl,
  );

  const res1 = await fetchIntance({
    base: 'CODEIT',
    method: 'POST',
    url: '/notes',
    body: { todoId, title, content, linkUrl },
  });

  if (!res1.ok) return res1;

  const data = await res1.json();
  const { noteId } = data;

  const res2 = await fetchIntance({
    base: 'BACKEND',
    method: 'PATCH',
    url: `/todos/${todoId}`,
    body: { noteId },
  });
  return res2;
}
