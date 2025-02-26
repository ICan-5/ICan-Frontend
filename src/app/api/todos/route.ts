import { NextRequest, NextResponse } from 'next/server';
import { getErrorMessage } from '@/constants/errorMessages';
import { fetchIntance } from '@/services/fetchInstance';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, goalId, date } = body;

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

  const res2 = await fetchIntance({
    base: 'BACKEND',
    url: '/todos',
    method: 'POST',
    body: { todoId: id, goalId, date, done: false, title, createdAt },
  });

  const finalData = res2.json();
  return NextResponse.json(finalData, { status: 201 });
}
