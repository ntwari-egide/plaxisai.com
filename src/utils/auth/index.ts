import axios from 'axios';
import Cookies from 'js-cookie';

import { decryptData } from '../encryptions';
import api from '@/global/axios-config';

export const validateJwtToken = async (): Promise<boolean> => {
  try {
    const storedData = JSON.parse(decryptData(Cookies.get('user-credentials') || ''));

    const response = await api.get('/auth/me',{
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${storedData.token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(" validated data: ", storedData);
    

    return response.status >= 200 && response.status < 300;
  } catch (error) {
    return false;
  }
};