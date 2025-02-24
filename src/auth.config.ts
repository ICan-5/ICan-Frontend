import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');
      const isOnSignupPage = nextUrl.pathname.startsWith('/signup');

      // 로그인/회원가입 페이지인 경우
      if (isOnLoginPage || isOnSignupPage) {
        // 로그인된 상태
        if (isLoggedIn) {
          return Response.redirect(new URL('/', nextUrl)); // 대시보드로 리디렉션
        }
        return true; // 로그인 안 했으면 로그인/회원가입 페이지 보여줌
      }

      // 홈(대시보드 페이지)와 그 외 경로 페이지인 경우
      if (nextUrl.pathname.startsWith('/')) {
        // 로그인 안 된 상태
        if (!isLoggedIn) {
          return Response.redirect(new URL('/login', nextUrl));
        }
        return true; // 로그인된 사용자는 대시보드 페이지 접근 허용
      }

      return true; // 그 외의 페이지는 기본적으로 접근 허용
    },
  },
  providers: [],
} satisfies NextAuthConfig;
