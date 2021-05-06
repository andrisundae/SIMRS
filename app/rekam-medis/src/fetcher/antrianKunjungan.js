import useSWR from 'swr';
import dummydata from '@module/antrian-rekam-medis/src/dummydata.json';

function fetcher(key) {
  return new Promise((resolve) => {
    let st = key.constructor === Array ? key[0] : key;
    setTimeout(
      () => {
        resolve(dummydata[st]);
      },
      'status_medis_data' === st ? 2000 : 1000
    );
  });
}

export function useAntrianKunjungan({ idTempatLayanan, penunjang = false }) {
  const { data, error, mutate } = useSWR(
    idTempatLayanan
      ? [
          penunjang ? 'antrian_data_penunjang' : 'antrian_data_non_penunjang',
          idTempatLayanan,
        ]
      : null,
    (url, idTempatLayanan) =>
      fetcher(url, {
        id_tempat_layanan: idTempatLayanan,
      })
  );
  return {
    error,
    data: data || [],
    isLoading: idTempatLayanan && !error && !data,
    mutate: mutate,
  };
}

export function useStatusMedisAntrian({ idTempatLayanan }) {
  const { data, error } = useSWR(
    idTempatLayanan ? ['status_medis_data', idTempatLayanan] : null,
    (url, idTempatLayanan) =>
      fetcher(url, {
        id_tempat_layanan: idTempatLayanan,
      })
  );
  return {
    error,
    data: data || [],
    isLoading: idTempatLayanan && !error && !data,
  };
}

export function useSidebarAntrianKunjungan() {
  const { data, error } = useSWR('sidebar_data', fetcher);
  return {
    error,
    data: data || [],
    isLoading: !error && !data,
  };
}

export function useSidebarJumlahPasien() {
  const { data, error } = useSWR('jumlah_pasien_data', fetcher);
  return {
    error,
    data: data || [],
    isLoading: !error && !data,
  };
}
