import {
  sumberLainState,
  filterState,
  sumberState,
  settingState,
} from '@simrs/main/src/modules/setting/default';

const sumberLain = {
  ...sumberLainState,
  data: {
    instalasi: [],
  },
};

export default {
  sumberLain,
  filter: { ...filterState },
  sumber: { ...sumberState },
  setting: { ...settingState },
  post: {
    needed: { instalasi: '' },
    optional: {},
  },
  focusElement: '',
  submitting: false,
};
