import { useQuery, useMutation } from 'react-query';
import fetcher, {post} from '@simrs/common/src/helpers/fetcher';

export function useKunjunganAktifRawatInap(idPasien, options = {}) {
  const queryKey = `/billing/transaksi/kunjungan/aktif-rawat-inap/${idPasien}`;
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
      enabled: !!idPasien,
      ...options,
      // onError: (error) =>
      //   message.error(error.message || 'Failed to load data from server!'),
    }
  );
}

export function useMutationKunjungan() {
  const queryKey = `/billing/transaksi/kunjungan/aktif-rawat-inap`;
  return useMutation((payload) => async () => {
    let response;
    try {
      const { data } = await post(queryKey, payload);
      response = data;
    } catch (error) {
      throw new Error('Failed to load data from server!');
    }
    return response;
  });
}
