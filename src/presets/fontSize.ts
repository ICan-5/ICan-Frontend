const fontSize: {
  [key: string]: [string, { lineHeight: string; fontWeight: string }];
} = {
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
};

export default fontSize;
