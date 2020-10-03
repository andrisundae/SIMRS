const moduleState = {
  data: {},
  post: {},
  statusForm: '',
  reference: {},
  selectedRow: 0,
  dataAfterSave: {},
  focusElement: '',
  openForm: false,
  errors: {},
  isSubmitted: false,
  submitting: false,
  saveSuccess: false,
};

const filterState = {
  data: {},
  post: {
    filter_index: '',
    filter_value: '',
  },
  isSubmitted: false,
};

export { moduleState, filterState };
