import { useQuery } from 'react-query';
import fetcher from '@simrs/common/src/helpers/fetcher';

export function useInformasiIndex(params = {}, options = {}) {
  const queryKey = `/farmasi/transaksi/informasi-pemakaian`;
  return useQuery(
    queryKey,
    async () => {
      let response;
      try {
        const { data } = await fetcher(queryKey, params);
        response = data;
      } catch (error) {
        throw new Error('Failed to load data from server!');
      }
      return response;
    },
    {
      enabled: false,
      ...options,
    }
  );
}
