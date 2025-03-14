import type { Config } from 'tailwindcss';
import fontSize from './src/presets/fontSize';
import colors from './src/presets/colors';
import { screen } from './src/presets/screen';

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
      },
      screens: {
        ...screen,
      },
    },
  },
  plugins: [],
  safelist: [
    'ql-align-center',
    'ql-align-right',
    'ql-align-left',
    {
      pattern: /data-list-.*/, // data-list 속성 보존
    },
  ],
};
export default config;
