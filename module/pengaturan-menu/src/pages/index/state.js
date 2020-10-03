export default {
  data: {
    menu: [],
    expandedKeys: [],
    selectedKeys: [],
  },
  post: {
    id: 0,
    nama: '',
    urutan: 0,
    key_menu: '',
    parent: 0,
    kode_app: '',
    default_action: 0,
  },
  postDetail: {
    id: 0,
    nama: '',
  },
  statusForm: '',
  statusFormDetail: '',
  focusElement: '',
  errors: {},
  saveSuccess: false,
};
