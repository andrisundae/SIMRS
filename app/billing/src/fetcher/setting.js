import { useQuery } from 'react-query';
import axios from '@simrs/common/src/helpers/axios';

export const getSetting = () => {
  return axios.get('/system/setting/aturan-aplikasi/settings');
};

export function useSetting() {
  const queryKey = '/system/setting/aturan-aplikasi/settings';
  return useQuery(queryKey, async () => {
    let response;
    try {
      const {
        data: { data },
      } = await getSetting();
      response = data;
    } catch (error) {
      throw new Error('Failed to load data from server!');
    }
    return response;
  });
}
