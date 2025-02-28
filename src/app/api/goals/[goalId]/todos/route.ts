import { NextRequest, NextResponse } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const goalId = searchParams.get('goalId');

  if (!goalId) {
    return NextResponse.json(
      { message: 'year and month and day are required' },
      { status: 400 },
    );
  }

  const res = await fetchIntance({
    base: 'BACKEND',
    method: 'GET',
    url: `goals/{goalId}`,
  });

  return res;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, goalId, date } = body;

  console.log('Received data:', { title, goalId, date });

  const res1 = await fetchIntance({
    base: 'CODEIT',
    method: 'POST',
    url: '/todos',
    body: { title, goalId },
  });

  if (!res1.ok) {
    return res1;
  }

  const data = await res1.json();
  const { id, createdAt } = data;

  const res2 = await fetchIntance({
    base: 'BACKEND',
    url: '/todos',
    method: 'POST',
    body: {
      todoId: id,
      goalId,
      date,
      done: false,
      title,
      createdAt,
    },
  });
  return res2;
}
