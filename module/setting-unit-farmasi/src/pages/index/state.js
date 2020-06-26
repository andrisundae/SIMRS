import {
  moduleState as module,
  filterState as filter,
} from '@simrs/main/src/modules/master/default';

const moduleState = {
  ...module,
  post: {
    id: '',
    id_unit_layanan: '',
    unit_layanan: '',
    st_gudang: false,
    st_penjualan: false,
    st_terima_resep: false,
    st_unit_bank_darah: false,
  },
};

const filterState = {
  ...filter,
  post: {
    ...filter.post,
    filter_index: 'idUnit',
  },
};

export { moduleState, filterState };
