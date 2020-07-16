import {
  sumberLainState,
  filterState,
  sumberState,
  settingState,
} from '@simrs/main/src/modules/setting/default';

const sumberLain = {
  ...sumberLainState,
  data: {
    unit_penunjang: [],
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
      unit_penunjang: '',
    },
    optional: {
      instalasi: '',
    },
  },
  focusElement: '',
  submitting: false,
};
