import useSWR from 'swr';
import fetcher from './fetcher';

export function useKelompokPemeriksaanFisiks() {
  const { data, error } = useSWR(
    '/rekam-medis/referensi-detail/view/by-referensi-alias/kelompok_pemeriksaan_fisik',
    fetcher
  );
  return {
    error,
    data: data || [],
    isLoading: !error && !data,
  };
}
