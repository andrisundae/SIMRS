import { useQuery, useMutation } from 'react-query';
import axios from '@simrs/common/src/helpers/axios';

export const getListTindakanLain = (params) => {
  return axios.get('/billing/transaksi/tindakanLain/view', { params });
};
export const getTindakanLain = (id) => {
  return axios.get(`/billing/transaksi/tindakanLain/${id}`);
};
export const createTindakanLain = (params) => {
  return axios.post('/billing/transaksi/tindakanLain/tambah', params);
};
export const editTindakanLain = (params) => {
  return axios.post('/billing/transaksi/tindakanLain/koreksi', params);
};
export const deleteTindakanLain = (params) => {
  return axios.post('/billing/transaksi/tindakanLain/hapus', params);
};

export function useListTindakanLain(params = {}, options = {}) {
  const queryKey = '/billing/transaksi/tindakanLain/view';
  return useQuery(
    [queryKey, params],
    async () => {
      let response;
      try {
        const {
          data: { data },
        } = await getListTindakanLain(params);
        response = data;
      } catch (error) {
        throw new Error('Failed to load data from server!');
      }
      return response;
    },
    options
  );
}

export function useTindakanLain(params, options = {}) {
  const queryKey = `/billing/transaksi/tindakanLain/${params.id}`;
  return useQuery(
    queryKey,
    async () => {
      let response;
      try {
        const {
          data: { data },
        } = await getTindakanLain(params.id);
        response = data;
      } catch (error) {
        throw new Error('Failed to load data from server!');
      }
      return response;
    },
    {
      enabled: !!params?.id,
      ...options,
    }
  );
}

export function useCreateTindakanLain() {
  return useMutation((payload) =>
    axios.post('/billing/transaksi/tindakanLain/tambah', payload)
  );
}

export function useEditTindakanLain() {
  return useMutation((payload) =>
    axios.post('/billing/transaksi/tindakanLain/koreksi', payload)
  );
}

export function useDeleteTindakanLain() {
  return useMutation((payload) =>
    axios.post('/billing/transaksi/tindakanLain/hapus', payload)
  );
}
