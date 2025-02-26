import { NextRequest, NextResponse } from 'next/server';
import { ERROR_MESSAGES } from '@/constants/errorMessages';

export function apiHandler(fn: (req: NextRequest) => Promise<Response>) {
  return async (req: NextRequest) => {
    try {
      const res = await fn(req);
      // 여기서 refresh 처리
      if (!res.ok)
        return NextResponse.json(
          {
            message:
              ERROR_MESSAGES[res.status as keyof typeof ERROR_MESSAGES] ||
              ERROR_MESSAGES.default,
          },
          {
            status: res.status,
          },
        );
      return res;
    } catch {
      return NextResponse.json(
        { message: ERROR_MESSAGES.default },
        {
          status: 500,
        },
      );
    }
  };
}
