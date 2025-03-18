import { NextRequest } from 'next/server';
import { fetchInstance } from '@/services/fetchInstance';

export async function GET(
  req: NextRequest,
  { params }: { params: { goalId: string } },
) {
  const goalId = Number(params.goalId);
  const res = await fetchInstance({
    method: 'GET',
    url: `/goals/${goalId}`,
  });

  return res;
}
