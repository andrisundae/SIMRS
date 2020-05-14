import {
  sumberLainState,
  filterState,
  sumberState,
  settingState,
} from '@simrs/main/src/modules/setting/default';

sumberLainState.data = {
  supplier: [],
};

export default {
  sumberLain: { ...sumberLainState },
  filter: { ...filterState },
  sumber: { ...sumberState },
  setting: { ...settingState },
  post: {
    needed: { supplier: '' },
    optional: {},
  },
  focusElement: '',
  submitting: false,
};
