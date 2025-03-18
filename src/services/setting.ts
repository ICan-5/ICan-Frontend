'use server';

import { fetchInstance } from './fetchInstance';

export const updateUser = async (formData: FormData) => {
  try {
    const res = await fetchInstance({
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
