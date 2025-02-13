import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0052CC',
        secondary: '#E6EFFC',

        background: 'var(--background)',
        foreground: 'var(--foreground)',

        // 임시 커스텀 컬러
        // 어두운 회색 계열
        grayDarkest: '#333333', // 가장 어두운 회색 (검정에 가까운 회색)
        grayDarker: '#666666', // 다크 그레이 (중간 어두운 회색)
        grayDark: '#808080', // 표준 어두운 회색

        // 중간 회색 계열
        grayLight: '#D1D1D1', // 연한 회색 (밝은 회색 계열의 시작)
        grayLighter: '#E8E8E8', // 더 밝은 회색 (흰색에 가까운 회색)

        // 밝은 회색 계열
        grayLightest: '#F1F1F1', // 가장 밝은 회색 (흰색에 가까운 회색)

        calBorder: '#ddd',
      },
    },
  },
  plugins: [],
};
export default config;
