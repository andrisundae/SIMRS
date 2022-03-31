import { useQuery } from 'react-query';
import axios from '@simrs/common/src/helpers/axios';


export function useTindakanSuggestion(params = {}, options = {}) {
  const queryKey = '/billing/master/tindakan/suggestion';
  return useQuery(
    [queryKey, params],
    async () => {
      let response;
      try {
        const {
          data: { data },
        } = await axios.get(queryKey, {params});
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
