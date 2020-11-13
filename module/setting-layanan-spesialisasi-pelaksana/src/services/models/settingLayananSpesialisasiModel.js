import { request } from '@simrs/common';
import i18n from 'i18next';

const validationPushRules = (resource) => {
  return {
    rules: {
      spesialisasi: { required: true },
      sumber: { required: true },
    },
    messages: {
      spesialisasi: {
        required: i18n.t(`${resource}:validator.spesialisasi.required`),
      },
      sumber: { required: i18n.t(`${resource}:validator.sumber.required`) },
    },
  };
};

const validationPushAllRules = (resource) => {
  return {
    rules: {
      spesialisasi: { required: true },
    },
    messages: {
      spesialisasi: {
        required: i18n.t(`${resource}:validator.spesialisasi.required`),
      },
    },
  };
};

const validationRevertRules = (resource) => {
  return {
    rules: {
      spesialisasi: { required: true },
      setting: { required: true },
    },
    messages: {
      spesialisasi: {
        required: i18n.t(`${resource}:validator.spesialisasi.required`),
      },
      setting: { required: i18n.t(`${resource}:validator.setting.required`) },
    },
  };
};

const validationRevertAllRules = (resource) => {
  return {
    rules: {
      spesialisasi: { required: true },
    },
    messages: {
      spesialisasi: {
        required: i18n.t(`${resource}:validator.spesialisasi.required`),
      },
    },
  };
};

const path = '/billing/setting/layanan-spesialisasi-pelaksana';

export default {
  getDataSumber: async (params) => {
    let response = await request.post(
      `${path}/view?typeData=dataSumber`,
      params
    );

    return response;
  },
  getDataSetting: async (params) => {
    let response = await request.post(
      `${path}/view?typeData=dataSetting`,
      params
    );

    return response;
  },
  getDataSumberLain: async (params = {}) => {
    let response = await request.post(
      `${path}/view?typeData=dataSumberLain`,
      params
    );

    return response;
  },
  getDataFilter: async (params = {}) => {
    let response = await request.post(`${path}/view?typeData=filter`, params);

    return response;
  },
  push: async (params) => {
    let response = await request.post(`${path}/koreksi`, params);

    return response;
  },
  revert: async (params) => {
    let response = await request.post(`${path}/hapus`, params);

    return response;
  },
  validationPushRules,
  validationPushAllRules,
  validationRevertRules,
  validationRevertAllRules,
};
