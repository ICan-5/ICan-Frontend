import { NextRequest, NextResponse } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function GET(
  req: NextRequest,
  { params }: { params: { noteId: number } },
) {
  const { noteId } = params;

  const res1 = await fetchIntance({
    base: 'CODEIT',
    method: 'GET',
    url: `/notes/${noteId}`,
  });
  if (!res1.ok) return res1;

  const noteData = await res1.json();

  const res2 = await fetchIntance({
    method: 'GET',
    url: `/todos/${noteData.todo.id}`,
  });

  if (!res2.ok) return res2;

  const todoData = await res2.json();
  return NextResponse.json({ noteData, todoData });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { noteId: number } },
) {
  const { noteId } = params;

  const res1 = await fetchIntance({
    base: 'CODEIT',
    method: 'DELETE',
    url: `/notes/${noteId}`,
  });

  if (!res1.ok) return res1;

  const res2 = await fetchIntance({
    method: 'DELETE',
    url: `/notes/${noteId}`,
  });

  return res2;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { noteId: number } },
) {
  const { noteId } = params;
  const body = await req.json();
  const { title, content, linkUrl } = body;

  const res1 = await fetchIntance({
    base: 'CODEIT',
    method: 'PATCH',
    url: `/notes/${noteId}`,
    body: {
      title,
      content,
      linkUrl,
    },
  });

  if (!res1.ok) {
    return Response.json(
      { error: 'Failed to update note' },
      { status: res1.status },
    );
  }

  const data = await res1.json();
  return Response.json(data);
}
