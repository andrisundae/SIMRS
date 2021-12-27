import { useQuery } from 'react-query';
import fetcher from '@simrs/common/src/helpers/fetcher';

export function useInformasiUnitFarmasi(options = {}) {
  const queryKey = `/farmasi/setting/unit-layanan/opt`;
  // const queryKey = '/billing/antrian/penunjang/init';

  console.log('api_path', queryKey);
  return useQuery(
    queryKey,
    async () => {
      let response;
      try {
        const result = await fetcher(queryKey);
        console.log('Result', result);
        //   response = result;
      } catch (error) {
        console.log('Catch', error);
        //   throw new Error('Failed to load data from server!');
      }
      // return response;
    },
    {
      ...options,
    }
  );
}
