const dataTable = {
  selectionSingle: 'single',
  selectionMultiple: 'multiple',
  keyBoard: {
    keyUp: 38,
    keyDown: 40,
    keyLeft: 37,
    keyRight: 39,
    shift: 16,
    enter: 13,
    escape: 27,
    space: 32,
  },
  contextMenu: {
    copy: 'copy',
    separator: 'separator',
  },
  theme: {
    balham: 'ag-theme-balham',
    material: 'ag-theme-material',
    fresh: 'ag-theme-fresh',
    blue: 'ag-theme-blue',
    dark: 'ag-theme-dark',
    bootstrap: 'ag-theme-bootsrap',
  },
  rowModelType: {
    infinite: 'infinite',
  },
  reloadType: {
    refresh: 'refresh',
    purge: 'purge',
  },
  alphanumeric: /^[a-zA-Z0-9]+$/,
};

export { dataTable as default };
