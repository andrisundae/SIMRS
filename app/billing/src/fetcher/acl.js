import useSWR from 'swr';
import fetcher from '@simrs/common/src/helpers/fetcher';

export function usePermissions({ route }) {
  const { data, error } = useSWR(
    ['/acl/tabel/fitur/granted', route],
    (url, route) =>
      fetcher(url, {
        menu: route,
      })
  );
  return {
    error,
    data: data || [],
    isLoading: !error && !data,
  };
}
