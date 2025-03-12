'use server';

import { fetchIntance } from './fetchInstance';

export const updateUser = async (formData: FormData) => {
  try {
    const res = await fetchIntance({
      url: '/user',
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw res.statusText;

    const data = await res.json();
    return data;
  } catch (error) {
    if (typeof error === 'string') return error;
    throw error;
  }
};
