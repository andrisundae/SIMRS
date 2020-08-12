import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
  return {
    rules: {
      stok_minimum: { minnumber: 0 },
      stok_maximum: {},
    },
    messages: {
      stok_minimum: {
        minnumber: i18n.t(`${resource}:validator.stok_minimum_unit.min`),
      },
      stok_maximum: {
        graeterthan: i18n.t(`${resource}:validator.stok_maximum_unit.greater`),
      },
    },
  };
};

const path = '/farmasi/setting/stok-minimum-unit';

export default {
  getAll: async (params) => {
    let response = await request.post(`${path}/view`, params);

    return response;
  },
  getUnitFarmasi: async (params) => {
    let response = await request.post(`${path}/unit-list`, params);

    return response;
  },
  save: async (method, params) => {
    let response = await request.post(`${path}/${method}`, params);

    return response;
  },
  validationRules,
};
