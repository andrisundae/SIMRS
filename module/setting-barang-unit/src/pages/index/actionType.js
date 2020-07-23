import { redux } from '@simrs/common';

const { createType } = redux;

export default {
  ON_TOGGLE_CHECK: createType('ON_TOGGLE_CHECK'),
};
