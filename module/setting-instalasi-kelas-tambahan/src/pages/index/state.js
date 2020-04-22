import {
  sumberLainState,
  filterState,
  sumberState,
  settingState,
} from '@simrs/main/src/modules/setting/default';

sumberLainState.data = {
  instalasi: [],
};

export default {
  sumberLain: { ...sumberLainState },
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
