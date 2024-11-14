import Cookies from 'js-cookie';

import api from '@/global/axios-config';

import { decryptData } from '../encryptions';

export const validateJwtToken = async (): Promise<boolean> => {
  try {
    const response = await getRealUserInfo(); // Await the async function
    return response && response.status >= 200 && response.status < 300; // Validate response status
  } catch (error) {
    return false;
  }
};

export const getRealUserInfo = async () => {
  const storedData = JSON.parse(
    decryptData(Cookies.get('user-credentials') || '')
  );

  const response = await api.get('/auth/me', {
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${storedData.token}`,
      'Content-Type': 'application/json',
    },
  });

  return response; // Return the full response object
};
