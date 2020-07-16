import {
  sumberLainState,
  filterState,
  sumberState,
  settingState,
} from '@simrs/main/src/modules/setting/default';

const sumberLain = {
  ...sumberLainState,
  data: {
    pelaksana: [],
  },
};

export default {
  sumberLain,
  filter: { ...filterState },
  sumber: { ...sumberState },
  setting: { ...settingState },
  post: {
    needed: { pelaksana: '' },
    optional: {},
  },
  focusElement: '',
  submitting: false,
};
