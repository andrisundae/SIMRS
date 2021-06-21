import { useQuery } from 'react-query';
import fetcher from '@simrs/common/src/helpers/fetcher';

export function usePasienByNorm(norm, options = {}) {
  return useQuery(
    ['/billing/master/pasien', norm],
    async () => {
      let response;
      try {
        const { data } = await fetcher(`/billing/master/pasien/${norm}`);
        response = data;
      } catch (error) {
        throw new Error('Failed to load data from server!');
      }
      return response;
    },
    {
      enabled: !!norm,
      ...options,
      // onError: (error) =>
      //   message.error(error.message || 'Failed to load data from server!'),
    }
  );
}
