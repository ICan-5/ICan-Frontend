import { NextRequest, NextResponse } from 'next/server';

const ERROR_MESSAGES = {
  400: '잘못된 요청입니다.',
  401: '인증이 필요합니다.',
  403: '권한이 없습니다.',
  404: '리소스를 찾을 수 없습니다.',
  500: '서버 오류가 발생했습니다.',
  default: '알 수 없는 오류가 발생했습니다.',
} as const;

export function apiHandler(fn: (req: NextRequest) => Promise<Response>) {
  return async (req: NextRequest) => {
    try {
      const res = await fn(req);
      // 여기서 refresh 처리
      if (!res.ok)
        return NextResponse.json({
          message:
            ERROR_MESSAGES[res.status as keyof typeof ERROR_MESSAGES] ||
            ERROR_MESSAGES.default,
          status: res.status,
        });

      return res;
    } catch {
      return new Response(JSON.stringify({ message: ERROR_MESSAGES.default }), {
        status: 500,
      });
    }
  };
}
