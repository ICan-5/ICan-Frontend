import { NextRequest, NextResponse } from 'next/server';
import { fetchInstance } from '@/services/fetchInstance';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { todoId: number } },
) {
  const { todoId } = params;
  const body = await req.json();
  const { title, goalId, date, done } = body;

  if (!title && goalId === undefined && done === undefined && !date) {
    return NextResponse.json(
      { message: 'title, goalId, done, date are required' },
      { status: 400 },
    );
  }

  const res1 = await fetchInstance({
    base: 'CODEIT',
    method: 'PATCH',
    url: `/todos/${todoId}`,
    body: { title, goalId, done },
  });

  if (!res1.ok) {
    return res1;
  }

  const { goal } = await res1.json();

  const res2 = await fetchInstance({
    url: `/todos/${todoId}`,
    method: 'PATCH',
    body: {
      goalId: goalId ?? 0,
      date,
      done,
      title,
    },
  });

  const res2Data = await res2.json();

  return NextResponse.json({
    ...res2Data,
    goal: { goalId: res2Data.goalId, ...goal },
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { todoId: number } },
) {
  const { todoId } = params;

  const res1 = await fetchInstance({
    base: 'CODEIT',
    method: 'DELETE',
    url: `/todos/${todoId}`,
  });

  if (!res1.ok) {
    return res1;
  }

  const res2 = await fetchInstance({
    url: `/todos/${todoId}`,
    method: 'DELETE',
  });

  return res2;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { todoId: number } },
) {
  const { todoId } = params;

  const res1 = await fetchInstance({
    base: 'CODEIT',
    method: 'GET',
    url: `/todos/${todoId}`,
  });

  if (!res1.ok) {
    return res1;
  }
  return res1;
}
