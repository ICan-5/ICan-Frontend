import { NextRequest } from 'next/server';
import { fetchInstance } from '@/services/fetchInstance';

export async function GET() {
  const res = await fetchInstance({
    method: 'GET',
    url: '/calendar/todo-basket',
  });

  return res;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, goalId } = body;

  const res = await fetchInstance({
    method: 'POST',
    url: '/calendar/todo-basket',
    body: { title, goalId },
  });

  return res;
}

export async function DELETE() {
  const res = await fetchInstance({
    method: 'DELETE',
    url: '/calendar/todo-basket',
  });

  return res;
}
