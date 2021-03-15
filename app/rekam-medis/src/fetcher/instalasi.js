import useSWR from 'swr';
import fetcher from './fetcher';

export function useInstalasis() {
  const { data, error } = useSWR('/rekam-medis/instalasi/view', fetcher);
  return {
    error,
    data: data || [],
    isLoading: !error && !data,
  };
}
