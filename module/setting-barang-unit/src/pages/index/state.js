import {
  sumberLainState,
  filterState,
  sumberState,
  settingState,
} from '@simrs/main/src/modules/setting/default';

const sumberLain = {
  ...sumberLainState,
  data: {
    unit_layanan: [],
  },
};

const filter = {
  ...filterState,
  data: {
    data_filter_sumber: {
      kelompok: [],
      jenis: [],
      golongan: [],
    },
  },
};

export default {
  sumberLain: { ...sumberLain },
  filter: { ...filter },
  sumber: { ...sumberState },
  setting: { ...settingState },
  post: {
    needed: { unit_layanan: '' },
    optional: { jenis: '', kelompok: '', golongan: '' },
  },
  focusElement: '',
  submitting: false,
};
