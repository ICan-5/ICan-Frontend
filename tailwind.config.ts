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
      },
    },
  },
  plugins: [],
};
export default config;
