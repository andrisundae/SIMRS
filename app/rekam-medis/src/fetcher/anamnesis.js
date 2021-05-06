import useSWR from 'swr';
import dummydata from '@module/anamnesis/src/dummydata.json';

function fetcher(key) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummydata[key]);
    }, 1000);
  });
}

export function useAnamnesis({ kodeKunjunganTL, rangkaian = false }) {
  const { data, error, mutate } = useSWR(
    kodeKunjunganTL ? ['data', kodeKunjunganTL, rangkaian] : null,
    (url, kodeKunjunganTL, rangkaian) =>
      fetcher(url, {
        kode_kunjungan_tl: kodeKunjunganTL,
        rangkaian: rangkaian,
      })
  );
  return {
    error,
    data: data || [],
    isLoading: kodeKunjunganTL && !error && !data,
    mutate: mutate,
  };
}
