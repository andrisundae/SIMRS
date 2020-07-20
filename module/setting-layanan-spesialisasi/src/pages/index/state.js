import {
  sumberLainState,
  filterState,
  sumberState,
  settingState,
} from '@simrs/main/src/modules/setting/default';

const sumberLain = {
  ...sumberLainState,
  data: {
    spesialisasi: [],
  },
};

const filter = {
  ...filterState,
  data: {
    ...filterState.data,
    data_filter_sumber: {
      kelompok: [],
    },
    filter_sumber: {
      klasifikasi: [],
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
      spesialisasi: '',
      klasifikasi: '',
    },
    optional: {
      kelompok: '',
    },
  },
  focusElement: '',
  submitting: false,
};
