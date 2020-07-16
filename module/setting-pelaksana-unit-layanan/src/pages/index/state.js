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
    status: [],
  },
};

const filter = {
  ...filterState,
  data: {
    ...filterState.data,
    filter_sumber_lain: {
      instalasi: [],
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
      unit_layanan: 0,
      status: 0,
    },
    optional: {
      instalasi: 0,
    },
  },
  focusElement: '',
  submitting: false,
};
