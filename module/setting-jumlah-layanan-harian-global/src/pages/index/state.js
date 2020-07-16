import {
  sumberLainState,
  filterState,
  sumberState,
  settingState,
} from '@simrs/main/src/modules/setting/default';

const sumberLain = {
  ...sumberLainState,
  data: {
    status_batasan: [],
  },
};

const filter = {
  ...filterState,
  data: {
    ...filterState.data,
    data_filter_sumber: {
      klasifikasi: [],
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
      klasifikasi: '',
      status_batasan: '',
      jumlah: 0,
    },
    optional: {
      kelompok: '',
    },
  },
  focusElement: '',
  submitting: false,
};
