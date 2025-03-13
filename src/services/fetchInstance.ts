'use server';

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { ERROR_MESSAGES, getErrorMessage } from '@/constants/errorMessages';

const BASEURL = {
  CODEIT: `${process.env.CODEIT_API_URL}/${process.env.TEAM_ID}`,
  BACKEND: process.env.BACKEND_API_URL,
  FRONTEND: process.env.FRONTEND_API_URL,
};

/**
 *
 * @param method 'GET', 'POST', 'PATCH', 'DELETE'
 * @param body 'POST', 'PATCH'일 경우 body
 * @returns {method, headers, body}
 */
const getConfig = async <T>(
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE',
  body?: T,
) => {
  const session = await auth();
  const Authorization = `Bearer ${session?.accessToken}`;
  const headers = { 'Content-Type': 'application/json', Authorization };

  if (method === 'GET' || method === 'DELETE') {
    return { method, headers };
  }

  if (body instanceof FormData) {
    return { method, headers: { Authorization }, body };
  }

  return { method, headers, body: JSON.stringify(body) };
};

/**
 * @param options
 * base: 요청 대상
 * url: 추가 url & query
 * method: 'GET', 'POST', 'PATCH', 'DELETE'
 * body?: 'POST'나 'PATCH'일 경우 body
 * @returns response
 */
export const fetchIntance = async <T>(options: {
  base?: 'CODEIT' | 'BACKEND' | 'FRONTEND';
  url: string;
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
  body?: T;
  params?: { [key: string]: string | number };
}) => {
  const { base = 'BACKEND', url, method, body, params } = options;
  try {
    // 요청 이전 코드

    // 요청
    const session = await auth();
    if (!session?.accessToken)
      return NextResponse.json(
        { message: ERROR_MESSAGES[401] },
        { status: 401 },
      );

    let baseUrl = `${BASEURL[base]}${url}`;

    if (params) {
      const searchParams = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)]),
      );
      baseUrl = `${baseUrl}?${searchParams.toString()}`;
    }

    const config = await getConfig(method, body);
    const res = await fetch(baseUrl, config);

    if (!res.ok) {
      const message = getErrorMessage(res.status);
      return NextResponse.json({ message }, { status: res.status });
    }

    return res;
  } catch {
    return NextResponse.json({ message: ERROR_MESSAGES[500] }, { status: 500 });
  }
};
