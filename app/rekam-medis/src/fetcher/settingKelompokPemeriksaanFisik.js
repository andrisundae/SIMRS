import useSWR from 'swr';
import { post } from '@simrs/common/src/helpers/request';
import fetcher from './fetcher';

export function useSettingKelompokPemeriksaanFisikView({
  idKelompokPemeriksaanFisik,
  idInstalasi,
}) {
  const { data, error, mutate } = useSWR(
    idKelompokPemeriksaanFisik
      ? [
          '/rekam-medis/setting-kelompok-pemeriksaan-fisik/view',
          idKelompokPemeriksaanFisik,
          idInstalasi,
        ]
      : null,
    (url, idKelompokPemeriksaanFisik, idInstalasi) =>
      fetcher(url, {
        id_kelompok_pemeriksaan_fisik: idKelompokPemeriksaanFisik,
        id_instalasi: idInstalasi,
      })
  );
  return {
    error,
    data: data || {
      unit_layanans: [],
      setting_kelompok_pemeriksaan_fisiks: [],
    },
    isLoading: idKelompokPemeriksaanFisik && !error && !data,
    mutate,
  };
}

export function insertSettingKelompokPemeriksaanFisik(input) {
  return post('/rekam-medis/setting-kelompok-pemeriksaan-fisik/insert', input);
}

export function deleteSettingKelompokPemeriksaanFisik(input) {
  return post('/rekam-medis/setting-kelompok-pemeriksaan-fisik/delete', input);
}
