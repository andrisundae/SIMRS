import { useQuery, useMutation } from 'react-query';
import axios from '@simrs/common/src/helpers/axios';

export const getInitPermintaanPenunjang = (params) => {
  return axios.get('/billing/transaksi/penunjang/init', { params });
};
export const getPenunjang = (params) => {
  return axios.get('/billing/transaksi/penunjang/view', { params });
};
export const getPermintaanLayanan = (params) => {
  return axios.get('/billing/transaksi/penunjang/permintaan-layanan', {
    params,
  });
};
export const getDokterTujuan = (idUnitLayanan) => {
  return axios.get(
    `/billing/transaksi/penunjang/dokter-tujuan/${idUnitLayanan}`
  );
};

export const editPermintaanPenunjang = (params) => {
  return axios.post('/billing/transaksi/penunjang/koreksi', params);
};

export function useListPenunjang(params = {}, options = {}) {
  const queryKey = '/billing/transaksi/penunjang/view';
  return useQuery(
    [queryKey, params],
    async () => {
      let response;
      try {
        const {
          data: { data },
        } = await getPenunjang(params);
        response = data;
      } catch (error) {
        throw new Error('Failed to load data from server!');
      }
      return response;
    },
    {
      keepPreviousData: true,
      ...options,
    }
  );
}

export function usePermintaanLayanan(params = {}, options = {}) {
  const queryKey = '/billing/transaksi/penunjang/permintaan-layanan';
  return useQuery(
    [queryKey, params],
    async () => {
      let response;
      try {
        const {
          data: { data },
        } = await getPermintaanLayanan(params);
        response = data;
      } catch (error) {
        throw new Error('Failed to load data from server!');
      }
      return response;
    },
    {
      enabled: !!params?.id_unit_layanan,
      ...options,
    }
  );
}

export function useDokterTujuan(idUnitLayanan, options = {}) {
  const queryKey = '/billing/transaksi/penunjang/dokter-tujuan';
  return useQuery(
    [queryKey, idUnitLayanan],
    async () => {
      let response;
      try {
        const {
          data: { data },
        } = await getDokterTujuan(idUnitLayanan);
        response = data;
      } catch (error) {
        throw new Error('Failed to load data from server!');
      }
      return response;
    },
    {
      enabled: !!idUnitLayanan,
      ...options,
    }
  );
}

export function useInitPermintaanPenunjang(idKunjunganUnit, options = {}) {
  const queryKey = '/billing/transaksi/penunjang/init';
  return useQuery(
    [queryKey, idKunjunganUnit],
    async () => {
      let response;
      try {
        const {
          data: { data },
        } = await getInitPermintaanPenunjang({
          id_kunjungan_unit: idKunjunganUnit,
        });
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

export function usePenunjangDetail(idKunjunganUnit, options = {}) {
  const queryKey = `/billing/transaksi/penunjang/${idKunjunganUnit}`;
  return useQuery(
    queryKey,
    async () => {
      let response;
      try {
        const {
          data: { data },
        } = await axios.get(queryKey);
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

export function usePenunjangTindakan(idKunjunganUnit, options = {}) {
  const queryKey = `/billing/transaksi/pemenuhanPenunjang/${idKunjunganUnit}/view`;
  return useQuery(
    queryKey,
    async () => {
      let response;
      try {
        const {
          data: { data },
        } = await axios.get(queryKey);
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

export function useCreatePermintaanPenunjang() {
  return useMutation((payload) =>
    axios.post('/billing/transaksi/penunjang/tambah', payload)
  );
}

export function useDeletePermintaanPenunjang() {
  return useMutation((payload) =>
    axios.post(`/billing/transaksi/penunjang/hapus/${payload.id}`)
  );
}

export function useEditPermintaanPenunjang() {
  return useMutation((payload) =>
    axios.post(`/billing/transaksi/penunjang/koreksi/${payload.id}`, payload)
  );
}

export function useEditStatusPenunjang() {
  return useMutation((payload) =>
    axios.post(
      `/billing/transaksi/pemenuhanPenunjang/${payload.id}/status`,
      payload
    )
  );
}

export function useResetPemenuhanPenunjang() {
  return useMutation((payload) =>
    axios.post(
      `/billing/transaksi/pemenuhanPenunjang/${payload.id}/resetPemenuhan`
    )
  );
}

export function usePenuhiSemuaPermintaanPenunjang() {
  return useMutation((payload) =>
    axios.post(
      `/billing/transaksi/pemenuhanPenunjang/${payload.id}/penuhiSemuaPermintaan`
    )
  );
}

export function useCreatePenunjangDetail() {
  return useMutation((payload) =>
    axios.post(
      `/billing/transaksi/pemenuhanPenunjang/${payload.id_kunjungan_unit}/tambah`,
      payload
    )
  );
}

export function useDeletePenunjangDetail() {
  return useMutation((payload) =>
    axios.post(`/billing/transaksi/pemenuhanPenunjang/hapus/${payload.id}`)
  );
}

export function useEditPenunjangDetail() {
  return useMutation((payload) =>
    axios.post(
      `/billing/transaksi/pemenuhanPenunjang/koreksi/${payload.id}`,
      payload
    )
  );
}
