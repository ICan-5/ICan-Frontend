'use server';

import { cookies } from 'next/headers';

const MAX_AGE = 60 * 60 * 24 * 365;

/** light, dark, system설정 */
export const setThemeMode = async (theme: string) => {
  cookies().set('themeMode', theme, { maxAge: MAX_AGE });
};

/** light, system(ligth) 일 경우 isDark false
 * dark, system(dark) 일 경우 isDark true
 * setThemeMode setThemeDark 구분하는 이유
 * dark일 경우, 애플리케이션에서 dark모드를 선택해서인지, system모드를 선택했는데 system이 dark인건지 구분하기 위해
 */
export const setThemeDark = async (isDark: boolean) => {
  cookies().set('themeDark', String(isDark), { maxAge: MAX_AGE });
};

/**
 * 웹 서비스 대표 컬러
 */
export const setThemeColor = async (themeColor: string) => {
  cookies().set('themeColor', themeColor, { maxAge: MAX_AGE });
};

/**
 * 테마 모드, 기본 light
 */
export const getThemeMode = async () => {
  const data = cookies().get('themeMode')?.value;
  return data || 'light';
};

/**
 * isDark 기본 false
 */
export const getThemeDark = async () => {
  const data = cookies().get('themeDark')?.value;
  return data || 'false';
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
