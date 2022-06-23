import { useQuery } from 'react-query';
import axios from '@simrs/common/src/helpers/axios';

export const getSuggestion = (params) => {
  return axios.get('/billing/master/komponen-tarif/suggestion', { params });
};

export function useKomponenTarifSuggestion(params = {}, options = {}) {
  const queryKey = '/billing/master/komponen-tarif/suggestion';
  return useQuery(
    [queryKey, params],
    async () => {
      let response;
      try {
        const {
          data: { data },
        } = await getSuggestion(params);
        response = data;
      } catch (error) {
        throw new Error('Failed to load data from server!');
      }
      return response;
    },
    options
  );
}
