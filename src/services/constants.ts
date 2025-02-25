import { auth } from '@/auth';

export const BACKENDURL = process.env.BACKEND_API_URL;

export const CODEITURL = `${process.env.CODEIT_API_URL}/${process.env.TEAM_ID}`;

/**
 * @returns 기본적으로 사용하는 header
 */
export const headers = async () => {
  const session = await auth();
  console.log(session?.accessToken);
  if (!session?.accessToken)
    return { 'Content-Type': 'application/json' } as HeadersInit;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session?.accessToken}`,
  } as HeadersInit;
};

/**
 * @returns Get 요청 config
 */
export const getConfig = async () => {
  return { method: 'GET', headers: await headers() } as RequestInit;
};

/**
 * formdata의 경우 알아서 header에 multipart/form이 설정됨
 * @param data formdata 또는 객체
 * @returns POST 요청 config
 */
export const postConfig = async <T>(data: FormData | T) => {
  const isFormData = data instanceof FormData;
  if (isFormData) {
    const session = await auth();
    return {
      method: 'POST',
      headers: { Authorization: `Bearer ${session?.accessToken}` },
      body: data,
    } as RequestInit;
  }
  return {
    method: 'POST',
    headers: await headers(),
    body: JSON.stringify(data),
  } as RequestInit;
};
