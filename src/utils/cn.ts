import clsx, { ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import fontSize from '@/presets/fontSize';
import colors from '@/presets/colors';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [...Object.keys(fontSize).map((e) => `text-${e}`)],
      'text-color': [...Object.keys(colors).map((e) => `text-${e}`)],
    },
  },
});

const cn = (...input: ClassValue[]) => customTwMerge(clsx(input));

export default cn;
