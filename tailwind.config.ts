import type { Config } from 'tailwindcss';
import fontSize from './src/presets/fontSize';
import colors from './src/presets/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/presets/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontSize,
      colors: {
        ...colors,
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        // 디자인 시스템 모두 적용 후 없애기
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
        // calendar
        calBorder: '#ddd',
      },
    },
  },
  plugins: [],
};
export default config;
