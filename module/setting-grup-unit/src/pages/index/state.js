import {
  sumberLainState,
  filterState,
  sumberState,
  settingState,
} from '@simrs/main/src/modules/setting/default';

const sumberLain = {
  ...sumberLainState,
  data: {
    grup: [],
  },
};

const filter = {
  ...filterState,
  data: {
    ...filterState.data,
    data_filter_sumber: {
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
      grup: '',
    },
    optional: {
      instalasi: '',
    },
  },
  focusElement: '',
  submitting: false,
};
