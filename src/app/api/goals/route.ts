import { NextRequest } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function GET() {
  const res = await fetchIntance({
    base: 'BACKEND',
    method: 'GET',
    url: '/goals',
  });
  return res;
}

export async function POST(req: NextRequest) {
  const title = req.nextUrl.searchParams.get('title');

  const res1 = await fetchIntance({
    base: 'CODEIT',
    method: 'POST',
    url: '/goals',
    body: { title },
  });

  if (!res1.ok) return res1;

  const data = await res1.json();
  const { id } = data;

  const res2 = await fetchIntance({
    base: 'BACKEND',
    method: 'POST',
    url: '/goals',
    body: { goalId: id, title },
  });
  return res2;
}
