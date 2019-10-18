import { request } from '@simrs/common';
import i18n from 'i18next';

const validationRules = (resource) => {
  return {
    rules: {
      alias: { required: true },
      prefix: { maxlength: 5 },
      format_tanggal: { required: true },
      type_reset: { required: true },
      jumlah_digit: { required: true },
    },
    messages: {
      alias: { required: i18n.t(`${resource}:validator.alias.required`) },
      prefix: { required: i18n.t(`${resource}:validator.prefix.required`) },
      format_tanggal: { required: i18n.t(`${resource}:validator.format_tanggal.required`) },
      type_reset: { required: i18n.t(`${resource}:validator.type_reset.required`) },
      jumlah_digit: { required: i18n.t(`${resource}:validator.jumlah_digit.required`) },
    }
  }
}

const validationSettingCounterRules = (resource) => {
  return {
    rules: {
      alias: { required: true },
      start_counter: { required: true },
    },
    messages: {
      alias: { required: i18n.t(`${resource}:validator.alias.required`) },
      start_counter: { required: i18n.t(`${resource}:validator.start_counter.required`) },
    }
  }
}

const path = '/billing/setting/no-transaksi';

export default {
  getAll: async (params) => {
    let response = await request.post(`${path}/view`, params);

    return response;
  },
  getDataForm: async () => {
    let response = await request.post(`${path}/data-form`, {});

    return response;
  },
  save: async (method, params) => {
    let response = await request.post(`${path}/${method}`, params);

    return response;
  },
  settingCounter: async (params) => {
    let response = await request.post(`${path}/setting-counter`, params);

    return response;
  },
  validationRules,
  validationSettingCounterRules
};
