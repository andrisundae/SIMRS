const masterState = {
  data: {
    initial: {
      nomor_transaksi: '',
      tanggal_transaksi: '',
    },
  },
  post: {
    form_type: 'master',
  },
  isSubmitted: false,
  submitting: false,
  focusElement: '',
  statusForm: '',
  openForm: false,
  dataAfterSave: {},
};

const detailState = {
  data: {
    master_id: '',
    item_list: [],
    selectedRow: 0,
  },
  post: {
    form_type: 'detail',
  },
  errors: [],
  isSubmitted: false,
  submitting: false,
  focusElement: '',
  statusForm: '',
  openForm: false,
  dataAfterSave: {},
};

const filterState = {
  data: {},
  cari_master: {
    filtered_data: 0,
    form_type: 'master',
    filter: '',
    filter_value: '',
  },
  cari_detail: {
    filtered_data: 0,
    form_type: 'detail',
    filter: '',
    filter_value: '',
  },
  filter_modal: {
    master_modal: {
      show: false,
    },
    detail_modal: {
      show: false,
    },
  },
  focusElement: '',
};

export { masterState, filterState, detailState };
