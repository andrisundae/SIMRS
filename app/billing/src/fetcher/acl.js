import { useQuery } from 'react-query';
import axios from '@simrs/common/src/helpers/axios';

export function usePermissions({ route }, options = {}) {
  const queryKey = '/acl/tabel/fitur/granted';
  return useQuery(
    [queryKey, route],
    async () => {
      let response;
      try {
        const params = { menu: route };
        const {
          data: { data },
        } = await axios.get(queryKey, {
          params,
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
