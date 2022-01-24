import { useQuery, useMutation } from 'react-query';
import fetcher, {post} from '@simrs/common/src/helpers/fetcher';

export function usePenunjang(params = {}, options = {}) {
  const queryKey = '/billing/transaksi/penunjang/view';
  return useQuery(
    [queryKey, params],
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
        const { data } = await fetcher(queryKey);
        response = data;
      } catch (error) {
        throw new Error('Failed to load data from server!');
      }
      return response;
    },
    {
      ...options,
    }
  );
}

export function useInitPermintaanPenunjang(options = {}) {
  const queryKey = '/billing/transaksi/penunjang/init';
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
      ...options,
    }
  );
}

export function useCreatePenunjang() {
  const queryKey = `/billing/transaksi/penunjang/tambah`;
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

export function useEditPenunjang() {
  const queryKey = `/billing/transaksi/penunjang/koreksi`;
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
