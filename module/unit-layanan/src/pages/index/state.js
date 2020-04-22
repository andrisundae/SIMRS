import {
  moduleState as module,
  filterState as filter,
} from '@simrs/main/src/modules/master/default';

const moduleState = {
  ...module,
  post: {
    id: '',
    nama: '',
    instalasi: '',
    kategori: '',
    aktif: 0,
    umur1: 0,
    umur2: 0,
    st_asal_kunjungan: 0,
    inisial: '',
    kode_mapping_bpjs: '',
    jenis_layanan: '',
  },
  data: {
    options_instalasi: [],
    options_kategori: [],
  },
};

const filterState = {
  ...filter,
  post: {
    ...filter.post,
    filter_index: 'instalasi',
  },
};

export { moduleState, filterState };
