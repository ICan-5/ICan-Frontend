export declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken?: string;
  }
  interface Session {
    accessToken: string;
    refreshToken?: string;
  }
}
