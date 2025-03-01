import { NextRequest } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function GET(
  req: NextRequest,
  { params }: { params: { goalId: string } },
) {
  const goalId = Number(params.goalId);
  const res = await fetchIntance({
    method: 'GET',
    url: `/goals/${goalId}`,
  });

  return res;
}
