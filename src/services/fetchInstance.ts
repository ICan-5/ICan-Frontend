import { NextResponse } from 'next/server';
import { auth, update } from '@/auth';
import { ERROR_MESSAGES, getErrorMessage } from '@/constants/errorMessages';

export const BACKENDURL = process.env.BACKEND_API_URL;
export const CODEITURL = `${process.env.CODEIT_API_URL}/${process.env.TEAM_ID}`;

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
 * refresh 요청 후 session의 accessToken 업데이트
 * @returns accessToekn 또는 null
 */
const handleTokenRefresh = async () => {
  const session = await auth();
  if (!session?.refreshToken) {
    return null;
  }

  const res = await fetch(`${BACKENDURL}/auth/refresh`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${session?.refreshToken}` },
  });

  if (!res.ok) return null;

  const data = await res.json();
  update({ ...session, accessToken: data.accessToken });
  return session.accessToken;
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
  base: 'CODEIT' | 'BACKEND';
  url: string;
  method: 'POST' | 'GET' | 'PATCH' | 'DELETE';
  body?: T;
}) => {
  const { base, url, method, body } = options;
  try {
    // 요청 이전 코드

    // 요청
    const session = await auth();

    if (!session?.accessToken) return NextResponse.json({ status: 401 });

    const baseUrl = `${base === 'CODEIT' ? CODEITURL : BACKENDURL}${url}`;
    let config = await getConfig(method, body);
    let res = await fetch(baseUrl, config);

    // 요청 이후 코드
    if (res.status === 401) {
      const newToken = await handleTokenRefresh();
      if (!newToken)
        return NextResponse.json(
          { message: ERROR_MESSAGES[401] },
          { status: 401 },
        );
      config = await getConfig(method, body);
      res = await fetch(baseUrl, config);
    }
    if (!res.ok) {
      const message = getErrorMessage(res.status);
      return NextResponse.json({ message }, { status: res.status });
    }

    return res;
  } catch {
    return NextResponse.json(
      { message: ERROR_MESSAGES.default },
      { status: 500 },
    );
  }
};

/**
 * @returns 기본적으로 사용하는 header
 */
// export const headers = async () => {
//   const session = await auth();
//   if (!session?.accessToken)
//     return { 'Content-Type': 'application/json' } as HeadersInit;
//   return {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${session?.accessToken}`,
//   } as HeadersInit;
// };

/**
 * @returns Get 요청 config
 */
// export const getConfig = async () => {
//   return { method: 'GET', headers: await headers() } as RequestInit;
// };

/**
 * formdata의 경우 알아서 header에 multipart/form이 설정됨
 * @param data formdata 또는 객체
 * @returns POST 요청 config
 */
// export const postConfig = async <T>(data: FormData | T) => {
//   const isFormData = data instanceof FormData;
//   if (isFormData) {
//     const session = await auth();
//     return {
//       method: 'POST',
//       headers: { Authorization: `Bearer ${session?.accessToken}` },
//       body: data,
//     } as RequestInit;
//   }
//   return {
//     method: 'POST',
//     headers: await headers(),
//     body: JSON.stringify(data),
//   } as RequestInit;
// };
