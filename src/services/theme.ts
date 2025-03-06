'use server';

import { cookies } from 'next/headers';

export const setTheme = async (theme: string) => {
  cookies().set('theme', theme, { maxAge: 31536000 });
};

export const setThemeColor = async (themeColor: string) => {
  cookies().set('themeColor', themeColor, { maxAge: 31536000 });
};

export const getTheme = async () => {
  const data = cookies().get('theme')?.value;
  return data || 'system';
};

export const getThemeColor = async (): Promise<
  'blue' | 'green' | 'pink' | 'purple'
> => {
  const data = await cookies().get('themeColor')?.value;
  return data === 'blue' ||
    data === 'green' ||
    data === 'pink' ||
    data === 'purple'
    ? data
    : 'blue';
};
