/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['codeit-ican.s3.ap-northeast-2.amazonaws.com'], // 외부 도메인 추가
  },
};

export default nextConfig;
