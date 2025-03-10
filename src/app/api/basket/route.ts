import { NextRequest } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function GET() {
  const res = await fetchIntance({
    method: 'GET',
    url: '/calendar/todo-basket',
  });

  return res;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, goalId } = body;

  const res = await fetchIntance({
    method: 'POST',
    url: '/calendar/todo-basket',
    body: { title, goalId },
  });

  return res;
}

export async function DELETE() {
  const res = await fetchIntance({
    method: 'DELETE',
    url: '/calendar/todo-basket',
  });

  return res;
}
