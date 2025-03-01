import { NextRequest } from 'next/server';
import { fetchIntance } from '@/services/fetchInstance';

export async function GET(
  req: NextRequest,
  { params }: { params: { nodeId: number } },
) {
  const { nodeId } = params;

  const res1 = fetchIntance({
    base: 'CODEIT',
    method: 'GET',
    url: `/notes/${nodeId}`,
  });

  return res1;
}
