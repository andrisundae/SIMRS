import { useQuery } from 'react-query';
import axios from '@simrs/common/src/helpers/axios';

export const getAntrianPenunjang = (params) => {
  return axios.get('/billing/antrian/penunjang', { params });
};

export function useInitAntrianPenunjang(options = {}) {
  const queryKey = '/billing/antrian/penunjang/init';
  return useQuery(
    queryKey,
    async () => {
      let response;
      try {
        const { data: {data} } = await axios.get(queryKey);
        response = data;
      } catch (error) {
        throw new Error('Failed to load data from server!');
      }
      return response;
    },
    {
      ...options,
    }
  );
}

export function useListAntrianPenunjang(params = {}, options = {}) {
  const queryKey = '/billing/antrian/penunjang';
  return useQuery(
    [queryKey, params],
    async () => {
      let response;
      try {
        const {
          data: { data },
        } = await getAntrianPenunjang(params);
        response = data;
      } catch (error) {
        throw new Error('Failed to load data from server!');
      }
      return response;
    },
    {
      // keepPreviousData: true,
      ...options,
    }
  );
}
