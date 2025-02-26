import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/services/apiHandler';
import {
  BACKENDURL,
  CODEITURL,
  getConfig,
  postConfig,
} from '@/services/constants';

export const GET = apiHandler(async () => {
  const res = await fetch(`${BACKENDURL}/goals`, await getConfig());
  return res;
});

export const POST = apiHandler(async (req: NextRequest) => {
  const title = req.nextUrl.searchParams.get('title');

  const res1 = await fetch(`${CODEITURL}/goals`, await postConfig({ title }));
  if (!res1.ok) return NextResponse.json({ status: 500 });

  const data = await res1.json();
  const { id } = data;

  const res2 = await fetch(
    `${BACKENDURL}/goals`,
    await postConfig({ goalId: id, title }),
  );
  return res2;
});
