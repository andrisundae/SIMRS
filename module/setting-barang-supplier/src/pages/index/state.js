import {
  sumberLainState,
  filterState,
  sumberState,
  settingState,
} from '@simrs/main/src/modules/setting/default';

const sumberLain = {
  ...sumberLainState,
  data: {
    supplier: [],
  },
};

export default {
  sumberLain: { ...sumberLain },
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
