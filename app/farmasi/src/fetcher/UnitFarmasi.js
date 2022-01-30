import { useQuery } from 'react-query';
import fetcher from '@simrs/common/src/helpers/fetcher';

export function useInformasiUnitFarmasi(options = {}) {
  const queryKey = `/farmasi/setting/unit-layanan/pilihan`;

  return useQuery(
    queryKey,
    async () => {
      let response;
      try {
        const { data } = await fetcher(queryKey);
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
