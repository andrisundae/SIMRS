import useSWR from 'swr';
import fetcher from '@simrs/common/src/helpers/fetcher';

export function useSystemInfo() {
  const { data, error } = useSWR('/system/info', fetcher);
  return {
    error,
    data: data || [],
    isLoading: !error && !data,
  };
}
