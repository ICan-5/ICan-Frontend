import { NextRequest, NextResponse } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';
import { getErrorMessage } from '@/constants/errorMessages';

export async function GET(
  req: NextRequest,
  { params }: { params: { goalId: string } },
) {
  const { goalId } = params;
  if (!goalId) {
    return NextResponse.json({ error: 'goalId is required' }, { status: 400 });
  }
  const res = await fetchIntance({
    base: 'CODEIT',
    method: 'GET',
    url: `/todos?goalId=${goalId}`,
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    return NextResponse.json(
      { error: errorData.message || 'Failed to fetch todos' },
      { status: res.status },
    );
  }
  const data = await res.json();
  return NextResponse.json({ todos: data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, goalId, date } = body;

  console.log('📥 Received request:', { title, goalId, date });

  const res1 = await fetchIntance({
    base: 'CODEIT',
    method: 'POST',
    url: '/todos',
    body: { title, goalId },
  });

  if (!res1.ok) {
    const message = getErrorMessage(res1.status);
    return NextResponse.json({ message }, { status: res1.status });
  }

  const data = await res1.json();
  const { id, createdAt } = data;

  // date 값이 undefined인 경우, 오늘 날짜를 기본값으로 사용합니다.
  const formattedDate = date || new Date().toISOString().split('T')[0];

  const res2 = await fetchIntance({
    base: 'BACKEND',
    url: '/todos',
    method: 'POST',
    body: {
      todoId: id,
      goalId,
      date: formattedDate,
      done: false,
      title,
      createdAt,
    },
  });

  if (!res2.ok) {
    const message = getErrorMessage(res2.status);
    return NextResponse.json({ message }, { status: res2.status });
  }

  const finalData = await res2.json();
  console.log('✅ Final Data:', finalData);
  return NextResponse.json(finalData, { status: 201 });
}
