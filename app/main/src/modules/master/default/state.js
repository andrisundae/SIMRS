const moduleState = {
  data: {},
  post: {},
  statusForm: '',
  selectedRow: 0,
  dataAfterSave: {},
  focusElement: '',
  openForm: false,
  errors: {},
  isSubmitted: false,
  submitting: false,
  saveStatus: false,
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
