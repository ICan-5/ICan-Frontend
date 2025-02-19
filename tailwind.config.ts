import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '12R': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
        '12M': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
        '14R': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        '14M': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        '14SB': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '600' }],
        '16R': ['1rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        '16M': ['1rem', { lineHeight: '1.75rem', fontWeight: '500' }],
        '16SB': ['1rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        '18R': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        '18M': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '500' }],
        '18SB': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        '40L': ['2.125rem', { lineHeight: '2rem', fontWeight: '300' }],
        '50L': ['3.125rem', { lineHeight: '1.25rem', fontWeight: '300' }],
      },
      colors: {
        gs00: '#FFFFFF',
        gs50: '#F8FAFC',
        gs100: '#F1F5F9',
        gs200: '#E2E8F0',
        gs300: '#CBD5E1',
        gs400: '#94A3B8',
        gs500: '#64748B',
        gs600: '#475569',
        gs700: '#334155',
        gs800: '#1E293B',
        gs900: '#0F172A',
        gs950: '#020617',
        gsBk: '#000000',

        warn50: '#FFF2F2',
        warn500: '#EE1E1E',
        goal01: '#9747FF',
        goal02: '#F86F65',
        slate50: '#EFF6FF',
        slate100: '#DBEAFE',
        slate200: '#BFDBFE',
        slate300: '#93C5FD',
        slate400: '#60A5FA',
        slate500: '#3B82F6',
        slate600: '#2563EB',
        slate700: '#1D4ED8',
        slate800: '#1E40AF',
        slate900: '#1E3A8A',
        slate950: '#172554',

        // 디자인 시스템 모두 적용 후 없애기
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#0052CC',
        secondary: '#E6EFFC',

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
