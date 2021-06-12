import { useQuery } from 'react-query';
import fetcher from '@simrs/common/src/helpers/fetcher';

// export function usePasienByNorm(norm) {
//   const { data, error, mutate } = useSWR(
//     [
//       '/billing/master/pasien',
//       norm,
//     ],
//     (url, norm) => fetcher(url, norm)
//   );
//   return {
//     error,
//     data,
//     isLoading: !error && !data,
//     mutate,
//   };
// }

export function usePasienByNorm(norm, options={}) {
  return useQuery(
    ['/billing/master/pasien', norm],
    () => {
      let response;
      try {
        response = fetcher(`/billing/master/pasien/${norm}`);
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
    },
  );
}
