import { useQuery } from 'react-query';
import fetcher from '@simrs/common/src/helpers/fetcher';

export function useKunjunganAktifRawatInap(idPasien, options = {}) {
  const queryKey = `/billing/transaksi/kunjungan-unit/kunjungan-aktif-rawat-inap/${idPasien}`;
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
    }
  );
}

export function useHistoryTempatTidur(idKunjunganUnit, options = {}) {
  const queryKey = '/billing/transaksi/kunjungan-unit/history-tempat-tidur';
  return useQuery(
    queryKey,
    async () => {
      let response;
      try {
        const { data } = await fetcher(queryKey, {idKunjunganUnit});
        response = data;
      } catch (error) {
        throw new Error('Failed to load data from server!');
      }
      return response;
    },
    {
      enabled: !!idKunjunganUnit,
      ...options,
    }
  );
}
