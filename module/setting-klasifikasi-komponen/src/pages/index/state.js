import {
  sumberLainState,
  filterState,
  sumberState,
  settingState,
} from '@simrs/main/src/modules/setting/default';

const sumberLain = {
  ...sumberLainState,
  data: {
    klasifikasi: [],
  },
};

export default {
  sumberLain,
  filter: { ...filterState },
  sumber: { ...sumberState },
  setting: { ...settingState },
  post: {
    needed: { klasifikasi: '' },
    optional: {},
  },
  focusElement: '',
  submitting: false,
};
