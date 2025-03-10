import { NextRequest, NextResponse } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

// 노트 생성
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { todoId, title, content, linkUrl } = body;

    const res1 = await fetchIntance({
      base: 'CODEIT',
      method: 'POST',
      url: '/notes',
      body: {
        todoId: Number(todoId), // 숫자 변환
        title,
        content,
        linkUrl,
      },
    });

    if (!res1.ok) return res1;

    const data = await res1.json();

    // 노트 id
    const { id: noteId } = data;

    // 노트 id를 해당 todo에 업데이트
    const res2 = await fetchIntance({
      base: 'BACKEND',
      method: 'PATCH',
      url: `/todos/${todoId}`,
      body: { noteId },
    });

    const data2 = await res2.json();

    return NextResponse.json(
      { message: '노트 생성이 완료되었습니다.', data: data2 },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: '노트 생성 중 에러가 발생했습니다.' },
      { status: 500 },
    );
  }
}

// 목표별 노트 리스트
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const goalId = searchParams.get('goalId');

  if (!goalId || Number.isNaN(Number(goalId))) {
    return NextResponse.json({ error: 'Invalid goalId' }, { status: 400 });
  }

  const res = await fetchIntance({
    base: 'CODEIT',
    method: 'GET',
    url: `/notes?goalId=${goalId}`,
  });

  return res;
}