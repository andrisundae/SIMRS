import useSWR from 'swr';
import dummydata from '@module/antrian-pasien-pulang/src/dummydata.json';

function fetcher(key, params) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummydata[key][params.kode_jenis_layanan]);
    }, 1000);
  });
}

export function useAntrianPasienPulang({ kodeJenisLayanan }) {
  const { data, error, mutate } = useSWR(
    kodeJenisLayanan ? ['data', kodeJenisLayanan] : null,
    (url, kodeJenisLayanan) =>
      fetcher(url, {
        kode_jenis_layanan: kodeJenisLayanan,
      })
  );
  return {
    error,
    data: data || [],
    isLoading: kodeJenisLayanan && !error && !data,
    mutate: mutate,
  };
}
