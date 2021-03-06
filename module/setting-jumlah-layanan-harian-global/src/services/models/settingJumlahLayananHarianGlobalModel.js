import { request } from '@simrs/common';
import i18n from 'i18next';

const validationPushRules = (resource) => {
  return {
    rules: {
      status_batasan: { required: true },
      jumlah: { required: true, minnumber: 1 },
      sumber: { required: true },
    },
    messages: {
      status_batasan: { required: i18n.t(`${resource}:validator.status_batasan.required`) },
      jumlah: {
        required: i18n.t(`${resource}:validator.jumlah.required`),
        minnumber: i18n.t(`${resource}:validator.jumlah.minnumber`),
      },
      sumber: { required: i18n.t(`${resource}:validator.sumber.required`) }
    }
  }
}

const validationPushAllRules = (resource) => {
  return {
    rules: {
      status_batasan: { required: true },
      jumlah: { required: true, minnumber: 1 },
    },
    messages: {
      status_batasan: { required: i18n.t(`${resource}:validator.status_batasan.required`) },
      jumlah: {
        required: i18n.t(`${resource}:validator.jumlah.required`),
        minnumber: i18n.t(`${resource}:validator.jumlah.minnumber`)
      },
    }
  }
}

const validationRevertRules = (resource) => {
  return {
    rules: {
      status_batasan: { required: true },
      jumlah: { required: true },
      klasifikasi: { required: true },
      setting: { required: true },
    },
    messages: {
      status_batasan: { required: i18n.t(`${resource}:validator.status_batasan.required`) },
      jumlah: { required: i18n.t(`${resource}:validator.jumlah.required`) },
      setting: { required: i18n.t(`${resource}:validator.setting.required`) }
    }
  }
}

const validationRevertAllRules = (resource) => {
  return {
    rules: {
      status_batasan: { required: true },
      jumlah: { required: true },
    },
    messages: {
      status_batasan: { required: i18n.t(`${resource}:validator.status_batasan.required`) },
      jumlah: { required: i18n.t(`${resource}:validator.jumlah.required`) },
    }
  }
}

const path = '/billing/setting/jumlah-layanan-harian-global';

export default {
  getDataSumber: async (params) => {
    let response = await request.post(`${path}/view?typeData=dataSumber`, params);

    return response;
  },
  getDataSetting: async (params) => {
    let response = await request.post(`${path}/view?typeData=dataSetting`, params);

    return response;
  },
  getDataSumberLain: async (params = {}) => {
    let response = await request.post(`${path}/view?typeData=dataSumberLain`, params);

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
