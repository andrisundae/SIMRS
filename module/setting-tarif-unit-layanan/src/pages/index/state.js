import {
  sumberLainState,
  filterState,
  sumberState,
  settingState,
} from '@simrs/main/src/modules/setting/default';

const filter = {
  ...filterState,
  data: {
    filter_sumber_lain: {
      instalasi: [],
    },
    data_filter_sumber: {
      versi_tarif: [],
      unit_layanan: [],
      kelompok: [],
      kelas: [],
    },
    filter_sumber: {
      klasifikasi: [],
    },
  },
};

export default {
  sumberLain: { ...sumberLainState },
  filter,
  sumber: { ...sumberState },
  setting: { ...settingState },
  post: {
    needed: {
      versi_tarif: '',
      unit_layanan: '',
      klasifikasi: '',
    },
    optional: {
      instalasi: '',
      kelompok: '',
      kelas: '',
    },
  },
  focusElement: '',
  submitting: false,
};
