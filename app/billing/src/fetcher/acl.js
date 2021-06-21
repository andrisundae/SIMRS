import { useQuery } from 'react-query';
import fetcher from '@simrs/common/src/helpers/fetcher';

export function usePermissions({ route }, options = {}) {
  return useQuery(
    ['/acl/tabel/fitur/granted', route],
    async () => {
      let response;
      try {
        const { data } = await fetcher('/acl/tabel/fitur/granted', {
          menu: route,
        });
        response = data;
      } catch (error) {
        throw new Error('Failed to load data from server!');
      }
      return response;
    },
    {
      enabled: !!route,
      ...options,
      // onError: (error) =>
      //   message.error(error.message || 'Failed to load data from server!'),
    }
  );
}
