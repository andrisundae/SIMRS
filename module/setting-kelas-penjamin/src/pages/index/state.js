import {
  sumberLainState,
  filterState,
  sumberState,
  settingState,
} from '@simrs/main/src/modules/setting/default';

const sumberLain = {
  ...sumberLainState,
  data: {
    penjamin: [],
  },
};

export default {
  sumberLain,
  filter: { ...filterState },
  sumber: { ...sumberState },
  setting: { ...settingState },
  post: {
    needed: { penjamin: '' },
    optional: {},
  },
  focusElement: '',
  submitting: false,
};
