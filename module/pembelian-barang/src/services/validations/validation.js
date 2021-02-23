import i18n from 'i18next';

export default {
  master: (resource) => {
    return {
      rules: {
        supplier: { required: true },
        unit_penerima: { required: true },
        nomor_faktur: { required: true },
        tanggal_faktur: { required: true },
        tanggal_jatuh_tempo: { required: true },
      },
      messages: {
        supplier: {
          required: i18n.t(`${resource}:validator.supplier.required`),
        },
        unit_penerima: {
          required: i18n.t(`${resource}:validator.unit_penerima.required`),
        },
        nomor_faktur: {
          required: i18n.t(`${resource}:validator.nomor_faktur.required`),
        },
        tanggal_faktur: {
          required: i18n.t(`${resource}:validator.tanggal_faktur.required`),
        },
        tanggal_jatuh_tempo: {
          required: i18n.t(
            `${resource}:validator.tanggal_jatuh_tempo.required`
          ),
        },
      },
    };
  },
  detail: (resource) => {
    return {
      rules: {
        no_batch: { required: true },
        jumlah_beli: { required: true },
        harga_satuan: { required: true },
        diskon: { required: true },
        diskon_rp: { required: true },
      },
      messages: {
        no_batch: {
          required: i18n.t(`${resource}:validator.no_batch.required`),
        },
        jumlah_beli: {
          required: i18n.t(`${resource}:validator.jumlah_beli.required`),
        },
        harga_satuan: {
          required: i18n.t(`${resource}:validator.harga_satuan.required`),
        },
        diskon: { required: i18n.t(`${resource}:validator.diskon.required`) },
        diskon_rp: {
          required: i18n.t(`${resource}:validator.diskon_rp.required`),
        },
      },
    };
  },
  finish: (resource) => {
    return {
      rules: {
        id: { required: true },
      },
      messages: {
        id: { required: i18n.t(`${resource}:validator.pembelian.required`) },
      },
    };
  },
  hapus: (resource) => {
    return {
      rules: {
        id: { required: true },
      },
      messages: {
        id: { required: i18n.t(`${resource}:validator.pembelian.required`) },
      },
    };
  },
};
