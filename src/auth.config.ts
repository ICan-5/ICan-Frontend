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

      // 로그인이 안되어있을 때 로그인, 회원가입 페이지 외의 페이지에 접근할 경우
      if (!isOnLoginPage && !isOnSignupPage && !isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      if ((isOnLoginPage || isOnSignupPage) && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }

      return true; // 그 외의 페이지는 기본적으로 접근 허용
    },
  },
  providers: [],
} satisfies NextAuthConfig;
