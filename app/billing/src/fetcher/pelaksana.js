import { useQuery } from 'react-query';
import axios from '@simrs/common/src/helpers/axios';

export function usePelaksanaByUnitLayanan(idUnitLayanan, options = {}) {
  const queryKey = `/billing/transaksi/tindakan/options-by-unitlayanan/${idUnitLayanan}`;
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
      enabled: !!idUnitLayanan,
      ...options,
    }
  );
}
