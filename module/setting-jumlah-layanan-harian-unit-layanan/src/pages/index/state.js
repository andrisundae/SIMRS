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
    status_batasan: [],
  },
};

const filter = {
  ...filterState,
  data: {
    ...filterState.data,
    data_filter_sumber: {
      klasifikasi: [],
      instalasi: [],
      kelompok: [],
    },
  },
};

export default {
  sumberLain,
  filter,
  sumber: { ...sumberState },
  setting: { ...settingState },
  post: {
    needed: {
      unit_layanan: '',
      klasifikasi: '',
      status_batasan: '',
      jumlah: '0',
    },
    optional: {
      kelompok: '',
    },
  },
  focusElement: '',
  submitting: false,
};
